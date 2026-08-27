import { readFileSync, writeFileSync, mkdirSync, globSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { estraiCarta } from "./estrai-carta.js";
import { validaCarta } from "./validatore.js";
import { generaReport } from "./report.js";
import type { CartaParsata } from "./schema.js";

const ROOT = fileURLToPath(new URL("../../", import.meta.url)); // repo root (decoded)
const PATTERN = ["carte/**/*.md", "leader/**/*.md"];

function trovaCarte(): string[] {
  return PATTERN.flatMap((p) => globSync(p, { cwd: ROOT })).sort();
}

function commitCorrente(): string {
  try {
    return execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim();
  } catch {
    return "sconosciuto";
  }
}

function main(): void {
  const files = trovaCarte();
  const carte: CartaParsata[] = files.map((rel) => {
    const md = readFileSync(ROOT + rel, "utf8");
    return validaCarta(estraiCarta(md, rel));
  });

  mkdirSync(ROOT + "dist-motore", { recursive: true });
  writeFileSync(ROOT + "dist-motore/carte.json", JSON.stringify(carte, null, 2) + "\n");
  writeFileSync(ROOT + "MOTORE-DA-FARE.md", generaReport(carte, commitCorrente()));

  const cat3 = carte.filter((c) => c.categoria === "CAT3").length;
  console.log(`${carte.length} carte · ${cat3} CAT3 → dist-motore/carte.json + MOTORE-DA-FARE.md`);
}

main();
