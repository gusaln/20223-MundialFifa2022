export enum FaseTipo {
  Final = "Final",
  Semi = "Semifinal",
  Cuartos = "Cuartos de final",
  Octavos = "Octavos de final",
}

export type EquipoId = string;
export type PartidoId = string;

export interface Fase {
  nombre: string;
  partidos: PartidoId[];
}

export interface Partido {
  partidoId: string;
  homeId: EquipoId;
  awayId: EquipoId;
}

export const torneo: Fase[] = [
  { nombre: "Final", partidos: ["Partido 64"] },
  { nombre: "Semifinal", partidos: ["Partido 62", "Partido 61"] },
  {
    nombre: "Cuartos de final",
    partidos: ["Partido 60", "Partido 59", "Partido 58", "Partido 57"],
  },
  {
    nombre: "Octavos de final",
    partidos: [
      "Partido 49",
      "Partido 50",
      "Partido 52",
      "Partido 51",
      "Partido 53",
      "Partido 54",
      "Partido 55",
      "Partido 56",
    ],
  },
];

export const partidosNombres = Object.fromEntries(
  torneo.flatMap((fase) =>
    fase.partidos.map((p, i) => [p, `${fase.nombre}: partido ${i + 1}`])
  )
);

function extraerPartidosYEquipos(raw: string) {
  const partidos: [PartidoId, Partido][] = [];
  const participantes = new Set<EquipoId>();

  raw
    .split("\n")
    .slice(1)
    .forEach((partidoRaw, i) => {
      if (partidoRaw.includes("Losers")) {
        return;
      }

      const [homeId, partidoId, awayId] = partidoRaw.trim().split(",");

      partidos.push([
        partidoId,
        {
          partidoId,
          homeId,
          awayId,
        },
      ]);

      participantes.add(homeId);
      participantes.add(awayId);
    });

  return {
    partidos: Object.fromEntries(partidos) as Record<PartidoId, Partido>,
    participantes: Array.from(participantes.values()).filter(
      (eq) => !eq.includes("Partido") && !eq.includes("Group")
    ),
  };
}

const PARTIDOS_RAW = `home,score,away,year
Qatar,Partido 1,Ecuador,2022
Senegal,Partido 2,Netherlands,2022
Qatar,Partido 18,Senegal,2022
Netherlands,Partido 19,Ecuador,2022
Ecuador,Partido 35,Senegal,2022
Netherlands,Partido 36,Qatar,2022
England,Partido 3,Iran,2022
United States,Partido 4,Wales,2022
Wales,Partido 17,Iran,2022
England,Partido 20,United States,2022
Wales,Partido 33,England,2022
Iran,Partido 34,United States,2022
Argentina,Partido 8,Saudi Arabia,2022
Mexico,Partido 7,Poland,2022
Poland,Partido 22,Saudi Arabia,2022
Argentina,Partido 24,Mexico,2022
Poland,Partido 39,Argentina,2022
Saudi Arabia,Partido 40,Mexico,2022
Denmark,Partido 6,Tunisia,2022
France,Partido 5,Australia,2022
Tunisia,Partido 21,Australia,2022
France,Partido 23,Denmark,2022
Australia,Partido 37,Denmark,2022
Tunisia,Partido 38,France,2022
Germany,Partido 11,Japan,2022
Spain,Partido 10,Costa Rica,2022
Japan,Partido 25,Costa Rica,2022
Spain,Partido 28,Germany,2022
Japan,Partido 43,Spain,2022
Costa Rica,Partido 44,Germany,2022
Morocco,Partido 12,Croatia,2022
Belgium,Partido 9,Canada,2022
Belgium,Partido 26,Morocco,2022
Croatia,Partido 27,Canada,2022
Croatia,Partido 41,Belgium,2022
Canada,Partido 42,Morocco,2022
Switzerland,Partido 13,Cameroon,2022
Brazil,Partido 16,Serbia,2022
Cameroon,Partido 29,Serbia,2022
Brazil,Partido 31,Switzerland,2022
Serbia,Partido 47,Switzerland,2022
Cameroon,Partido 48,Brazil,2022
Uruguay,Partido 14,South Korea,2022
Portugal,Partido 15,Ghana,2022
South Korea,Partido 30,Ghana,2022
Portugal,Partido 32,Uruguay,2022
Ghana,Partido 45,Uruguay,2022
South Korea,Partido 46,Portugal,2022
Ganador Group A,Partido 49,Runners-up Group B,2022
Ganador Group C,Partido 50,Runners-up Group D,2022
Ganador Group D,Partido 52,Runners-up Group C,2022
Ganador Group B,Partido 51,Runners-up Group A,2022
Ganador Group E,Partido 53,Runners-up Group F,2022
Ganador Group G,Partido 54,Runners-up Group H,2022
Ganador Group F,Partido 55,Runners-up Group E,2022
Ganador Group H,Partido 56,Runners-up Group G,2022
Ganador Partido 53,Partido 58,Ganador Partido 54,2022
Ganador Partido 49,Partido 57,Ganador Partido 50,2022
Ganador Partido 55,Partido 60,Ganador Partido 56,2022
Ganador Partido 51,Partido 59,Ganador Partido 52,2022
Ganador Partido 57,Partido 61,Ganador Partido 58,2022
Ganador Partido 59,Partido 62,Ganador Partido 60,2022
Losers Partido 61,Partido 63,Losers Partido 62,2022
Ganador Partido 61,Partido 64,Ganador Partido 62,2022`;

const { partidos, participantes } = extraerPartidosYEquipos(PARTIDOS_RAW);

// prettier-off
const resultadosReales: Record<string, EquipoId> = {
  "Ganador Group A": "Netherlands",
  "Runners-up Group A": "Senegal",

  "Ganador Group B": "England",
  "Runners-up Group B": "United States",

  "Ganador Group C": "Argentina",
  "Runners-up Group C": "Poland",

  "Ganador Group D": "France",
  "Runners-up Group D": "Australia",

  "Ganador Group E": "Japan",
  "Runners-up Group E": "Spain",

  "Ganador Group F": "Morocco",
  "Runners-up Group F": "Croatia",

  "Ganador Group G": "Brazil",
  "Runners-up Group G": "Switzerland",

  "Ganador Group H": "Portugal",
  "Runners-up Group H": "South Korea",
} as const;

export { partidos, participantes, resultadosReales };
