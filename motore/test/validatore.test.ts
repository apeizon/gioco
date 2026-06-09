import { test, expect } from "vitest";
import { validaCarta } from "../src/validatore.js";

test("carta santuario => CAT2 con effetti", () => {
  const c = validaCarta({
    nome: "Forgia della Fiamma",
    file: "carte/x/FORGIA.md",
    campi: {
      Tipo: "Santuario",
      Fazione: "Sud",
      Costo: "2 Sud + 1",
      Effetto: "Tutte le creature attaccanti guadagnano +1 ATK.",
    },
  });
  expect(c.categoria).toBe("CAT2");
  expect(c.id).toBe("FORGIA");
  expect(c.effetti).toHaveLength(1);
  expect(c.fazione).toBe("Sud");
});

test("carta solo keyword => CAT1", () => {
  const c = validaCarta({
    nome: "Sentinella",
    file: "x/SENT.md",
    campi: { Tipo: "Creatura", Keyword: "Vedetta", "ATK / DEF": "2 / 3" },
  });
  expect(c.categoria).toBe("CAT1");
  expect(c.keyword).toContain("vedetta");
});

test("effetto strano => CAT3 con motivo", () => {
  const c = validaCarta({
    nome: "Keth",
    file: "leader/KETH.md",
    campi: { Tipo: "Leader", Effetto: "Converte ogni danno subito in segnalini soglia mobile." },
  });
  expect(c.categoria).toBe("CAT3");
  expect(c.motivoCat3).toBeTruthy();
});

test("legge effetti anche da Bonus e Malus", () => {
  const c = validaCarta({
    nome: "Tragedia X",
    file: "x/T.md",
    campi: { Tipo: "Tragedia", Bonus: "Pesca 1 carta.", Malus: "Infliggi 1 danno a una creatura avversaria." },
  });
  expect(c.categoria).toBe("CAT2");
  expect(c.effetti.length).toBeGreaterThanOrEqual(2);
});
