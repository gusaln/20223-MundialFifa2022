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
  { nombre: "Final", partidos: ["Match 64"] },
  { nombre: "Semifinal", partidos: ["Match 62", "Match 61"] },
  {
    nombre: "Cuartos de final",
    partidos: ["Match 60", "Match 59", "Match 58", "Match 57"],
  },
  {
    nombre: "Octavos de final",
    partidos: [
      "Match 49",
      "Match 50",
      "Match 52",
      "Match 51",
      "Match 53",
      "Match 54",
      "Match 55",
      "Match 56",
    ],
  },
];

function extraerPartidosYEquipos(
  raw: string
): [Record<PartidoId, Partido>, EquipoId[]] {
  const partidos: [PartidoId, Partido][] = [];
  const participantes = new Set<EquipoId>();

  raw
    .split("\n")
    .slice(1)
    .forEach((partidoRaw, i) => {
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

  return [
    Object.fromEntries(partidos),
    Array.from(participantes.values()).filter(
      (eq) => !eq.includes("Match") && !eq.includes("Group")
    ),
  ];
}

const PARTIDOS_RAW = `home,score,away,year
Qatar,Match 1,Ecuador,2022
Senegal,Match 2,Netherlands,2022
Qatar,Match 18,Senegal,2022
Netherlands,Match 19,Ecuador,2022
Ecuador,Match 35,Senegal,2022
Netherlands,Match 36,Qatar,2022
England,Match 3,Iran,2022
United States,Match 4,Wales,2022
Wales,Match 17,Iran,2022
England,Match 20,United States,2022
Wales,Match 33,England,2022
Iran,Match 34,United States,2022
Argentina,Match 8,Saudi Arabia,2022
Mexico,Match 7,Poland,2022
Poland,Match 22,Saudi Arabia,2022
Argentina,Match 24,Mexico,2022
Poland,Match 39,Argentina,2022
Saudi Arabia,Match 40,Mexico,2022
Denmark,Match 6,Tunisia,2022
France,Match 5,Australia,2022
Tunisia,Match 21,Australia,2022
France,Match 23,Denmark,2022
Australia,Match 37,Denmark,2022
Tunisia,Match 38,France,2022
Germany,Match 11,Japan,2022
Spain,Match 10,Costa Rica,2022
Japan,Match 25,Costa Rica,2022
Spain,Match 28,Germany,2022
Japan,Match 43,Spain,2022
Costa Rica,Match 44,Germany,2022
Morocco,Match 12,Croatia,2022
Belgium,Match 9,Canada,2022
Belgium,Match 26,Morocco,2022
Croatia,Match 27,Canada,2022
Croatia,Match 41,Belgium,2022
Canada,Match 42,Morocco,2022
Switzerland,Match 13,Cameroon,2022
Brazil,Match 16,Serbia,2022
Cameroon,Match 29,Serbia,2022
Brazil,Match 31,Switzerland,2022
Serbia,Match 47,Switzerland,2022
Cameroon,Match 48,Brazil,2022
Uruguay,Match 14,South Korea,2022
Portugal,Match 15,Ghana,2022
South Korea,Match 30,Ghana,2022
Portugal,Match 32,Uruguay,2022
Ghana,Match 45,Uruguay,2022
South Korea,Match 46,Portugal,2022
Winners Group A,Match 49,Runners-up Group B,2022
Winners Group C,Match 50,Runners-up Group D,2022
Winners Group D,Match 52,Runners-up Group C,2022
Winners Group B,Match 51,Runners-up Group A,2022
Winners Group E,Match 53,Runners-up Group F,2022
Winners Group G,Match 54,Runners-up Group H,2022
Winners Group F,Match 55,Runners-up Group E,2022
Winners Group H,Match 56,Runners-up Group G,2022
Winners Match 53,Match 58,Winners Match 54,2022
Winners Match 49,Match 57,Winners Match 50,2022
Winners Match 55,Match 60,Winners Match 56,2022
Winners Match 51,Match 59,Winners Match 52,2022
Winners Match 57,Match 61,Winners Match 58,2022
Winners Match 59,Match 62,Winners Match 60,2022
Losers Match 61,Match 63,Losers Match 62,2022
Winners Match 61,Match 64,Winners Match 62,2022`;

const [partidos, equipos] = extraerPartidosYEquipos(PARTIDOS_RAW);

// prettier-off
const resultadosReales: Record<string, EquipoId> = {
  "Winners Group A": "Netherlands",
  "Runners-up Group A": "Senegal",

  "Winners Group B": "England",
  "Runners-up Group B": "United States",

  "Winners Group C": "Argentina",
  "Runners-up Group C": "Poland",

  "Winners Group D": "France",
  "Runners-up Group D": "Australia",

  "Winners Group E": "Japan",
  "Runners-up Group E": "Spain",

  "Winners Group F": "Morocco",
  "Runners-up Group F": "Croatia",

  "Winners Group G": "Brazil",
  "Runners-up Group G": "Switzerland",

  "Winners Group H": "Portugal",
  "Runners-up Group H": "South Korea",
} as const;

export { partidos, equipos, resultadosReales };
