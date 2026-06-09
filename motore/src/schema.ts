// Proprietario di un bersaglio. TUTTI = regola: quando il testo non specifica.
export type Proprietario = "TUE" | "AVVERSARIO" | "TUTTI";

export type Categoria = "CAT1" | "CAT2" | "CAT3";

export interface Target {
  tipo: string;               // "creatura" | "giocatore" | "avamposto" | ...
  filtro?: string;            // "attaccante" | "costo<=3" | "tipo:Driade" | "def>=4"
  proprietario: Proprietario;
  quantificatore?: "una" | "ogni" | "tutte";
}

export interface Azione {
  verbo: string;              // es. "modifica_stat", "genera_token"
  target?: Target;
  // parametri liberi specifici del verbo (stat, valore, token, durata, ...)
  [param: string]: unknown;
}

export interface Effetto {
  trigger: string;            // "etb" | "morte" | "passiva" | "upkeep" | ...
  azioni: Azione[];
}

export interface CartaParsata {
  id: string;                 // nome file senza estensione
  file: string;               // path relativo repo
  nome: string;
  tipo: string;
  fazione?: string;
  costo?: string;
  keyword: string[];
  effetti: Effetto[];
  categoria: Categoria;
  motivoCat3?: string;        // se CAT3: perché non parsata
}
