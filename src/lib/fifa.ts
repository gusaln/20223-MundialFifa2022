import { groupBy } from "lodash";
import jugadores from "../data/jugadores";
import { partidosData } from "../data/partidos";

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
  { nombre: "Semifinal", partidos: ["Partido 62", "Partido 61"].sort() },
  {
    nombre: "Cuartos de final",
    partidos: ["Partido 60", "Partido 59", "Partido 58", "Partido 57"].sort(),
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
    ].sort(),
  },
];

export const partidosNombres = Object.fromEntries(
  torneo.flatMap((fase) => fase.partidos.map((p, i) => [p, `${fase.nombre}: partido ${i + 1}`]))
);

// prettier-off
export const resultadosReales: Record<string, EquipoId> = {
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

// prettier-off
export const octavosResultados: Record<string, EquipoId> = {
  "Ganador Partido 49": "Netherlands",
  "Ganador Partido 50": "Argentina",

  "Ganador Partido 51": "England",
  "Ganador Partido 52": "France",

  "Ganador Partido 53": "Croatia",
  "Ganador Partido 54": "Brazil",

  "Ganador Partido 55": "Moroco",
  "Ganador Partido 56": "Portugal",
} as const;

// prettier-off
export const cuartosResultados: Record<string, EquipoId> = {
  "Ganador Partido 57": "Argentina",
  "Ganador Partido 59": "France",

  "Ganador Partido 58": "Croatia",
  "Ganador Partido 60": "Moroco",
} as const;

export const partidos: Record<PartidoId, Partido> = partidosData;

export function getEquipoDeResultado(resultados: Record<string, string>, resultadoId: string) {
  while (resultados[resultadoId]) {
    resultadoId = resultados[resultadoId];
  }

  return resultadoId;
}

const participantes = Object.fromEntries(
  Array.from(new Set(Object.values(partidos).flatMap((p) => [p.homeId, p.awayId]))).map((e) => [e, true])
);

export const mundialJugadores = groupBy(
  jugadores.filter((j) => participantes[j.equipo]),
  "equipo"
);

// console.log(mundialJugadores);
