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

test("avamposto tappato => CAT2 con archetipo e mana", () => {
  const c = validaCarta({
    nome: "Altipiano",
    file: "carte/avamposti/avamposti-tappati/ALTIPIANO.md",
    campi: { Tipo: "Avamposto", Effetto: "Entra tappato. Genera 1 mana Nord, 1 mana Ovest o 1 mana Centro a scelta." },
  });
  expect(c.categoria).toBe("CAT2");
  expect(c.effetti[0].azioni[0].verbo).toBe("avamposto");
  expect(c.effetti[0].azioni[0].archetipo).toBe("tappato");
  expect((c.effetti[0].azioni[0].mana as any).colori).toEqual(["nord", "ovest", "centro"]);
});

test("avamposto dormiente => CAT2, mai CAT3", () => {
  const c = validaCarta({
    nome: "Altare",
    file: "carte/avamposti/avamposti-dormienti/ALTARE.md",
    campi: { Tipo: "Avamposto", Effetto: "Entra inattivo — non genera mana finché la condizione non è soddisfatta. Si attiva la prima volta che recuperi HP. Una volta attivo, genera 1 mana Nord o 1 mana Centro a scelta per turno." },
  });
  expect(c.categoria).toBe("CAT2");
  expect(c.effetti[0].azioni[0].archetipo).toBe("dormiente");
});
