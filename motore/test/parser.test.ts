import { test, expect } from "vitest";
import { parseEffetto } from "../src/parser.js";

test("FORGIA: passiva + modifica_stat TUTTI", () => {
  const r = parseEffetto("Tutte le creature attaccanti guadagnano +1 ATK.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti).toHaveLength(1);
  const e = r.effetti[0];
  expect(e.trigger).toBe("passiva");
  expect(e.azioni[0].verbo).toBe("modifica_stat");
  expect(e.azioni[0].target?.proprietario).toBe("TUTTI");
  expect(e.azioni[0].valore).toBe(1);
});

test("MORDETH parte 2: trigger morte + genera_token", () => {
  const r = parseEffetto("Quando muore: genera un token Non-Morto 1/1 sotto il tuo controllo.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  const e = r.effetti[0];
  expect(e.trigger).toBe("morte");
  expect(e.azioni[0].verbo).toBe("genera_token");
  expect((e.azioni[0].token as any).controllore).toBe("tu");
});

test("frase fuori vocabolario => CAT3", () => {
  const r = parseEffetto("Riavvolge il tempo di tre turni e inverte le sorti del fato.");
  expect(r.ok).toBe(false);
});

test("piu' frasi separate da punto", () => {
  const r = parseEffetto("Pesca 1 carta. Infliggi 2 danni a una creatura avversaria.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti).toHaveLength(2);
});

test("concedi keyword: TUTTI guadagnano Frenesia", () => {
  const r = parseEffetto("Tutte le creature guadagnano Frenesia.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("concedi_keyword");
  expect(r.effetti[0].azioni[0].keyword).toBe("frenesia");
  expect(r.effetti[0].azioni[0].target?.proprietario).toBe("TUTTI");
});

test("concedi keyword TUE: le tue creature hanno Arcano", () => {
  const r = parseEffetto("Le tue creature hanno Arcano.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("concedi_keyword");
  expect(r.effetti[0].azioni[0].target?.proprietario).toBe("TUE");
});

test("mill: millano N carte", () => {
  const r = parseEffetto("Tutti i giocatori millano 3 carte.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("mill");
  expect(r.effetti[0].azioni[0].valore).toBe(3);
});

test("mill: mette le prime N carte nel Cimitero", () => {
  const r = parseEffetto("Ogni giocatore mette le prime 4 carte del proprio mazzo nel proprio Cimitero.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("mill");
  expect(r.effetti[0].azioni[0].valore).toBe(4);
});

test("genera_mana via 'aggiungi'", () => {
  const r = parseEffetto("Aggiungi 1 mana generico.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("genera_mana");
});

test("strip markup: frase con ** non crea CAT3", () => {
  const r = parseEffetto("La creatura equipaggiata guadagna Frenesia. **");
  expect(r.ok).toBe(true);
});

test("stat combo etichettato atk/def", () => {
  const r = parseEffetto("La creatura equipaggiata riceve +0 atk/+2 def.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("modifica_stat_combo");
  expect(r.effetti[0].azioni[0].def).toBe(2);
  expect(r.effetti[0].azioni[0].atk).toBe(0);
});

test("stat combo non etichettato +0/+1", () => {
  const r = parseEffetto("Mentre è in campo: tutte le tue unità guadagnano +0/+1.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("modifica_stat_combo");
});

test("applica_stat", () => {
  const r = parseEffetto("Quando entra in campo: applica -2/-2 a un'unità avversaria a scelta.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("applica_stat");
  expect(r.effetti[0].azioni[0].atk).toBe(-2);
});

test("segnalino_stat", () => {
  const r = parseEffetto("Una tua creatura guadagna un segnalino +0/+1 permanente.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("segnalino_stat");
  expect(r.effetti[0].azioni[0].permanente).toBe(true);
});

test("mill singolare 'la prima carta'", () => {
  const r = parseEffetto("Ogni avversario mette la prima carta del proprio mazzo nel proprio Cimitero.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("mill");
  expect(r.effetti[0].azioni[0].valore).toBe(1);
});

test("singolo +1 ATK ancora modifica_stat (no regressione)", () => {
  const r = parseEffetto("Tutte le creature attaccanti guadagnano +1 ATK.");
  expect(r.ok).toBe(true);
  if (!r.ok) return;
  expect(r.effetti[0].azioni[0].verbo).toBe("modifica_stat");
});
