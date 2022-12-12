import fortalezaPorEquipo from "../data/fortalezaPorEquipo";
import { poissonDistribution } from "simple-statistics";

export function predictPoints(home: string, away: string) {
  if (!fortalezaPorEquipo[home] || !fortalezaPorEquipo[away]) return [0, 0];

  let lamb_home = fortalezaPorEquipo[home].goalsScored * fortalezaPorEquipo[away].goalsConceded;
  let lamb_away = fortalezaPorEquipo[away].goalsScored * fortalezaPorEquipo[home].goalsConceded;

  let prob_home = 0,
    prob_away = 0,
    prob_draw = 0;

  // console.log({ lamb_home, lamb_away });

  for (let i = 0; i < 11; i++) /*total de goles del equipo local*/ {
    for (let j = 0; j < 11; j++) /*total de goles del equipo visitante*/ {
      const p = poisson_prob(i, lamb_home) * poisson_prob(j, lamb_away);

      if (i == j) {
        prob_draw = prob_draw + p;
      } else if (i > j) {
        prob_home = prob_home + p;
      } else {
        prob_away = prob_away + p;
      }
    }
  }

  const points_home = 3 * prob_home + prob_draw;
  const points_away = 3 * prob_away + prob_draw;

  // console.log({ home, away, points_home, points_away });

  return [points_home, points_away];
}

const factCache: Record<number, number> = { 0: 1, 1: 1 };

function factorial(n: number) {
  if (n < 1) return 1;
  if (factCache[n]) return factCache[n];

  factCache[n] = factorial(n - 1) * n;

  return factCache[n];
}

export function poisson_prob(x: number, lambda: number) {
  return (Math.exp(-lambda) * Math.pow(lambda, x)) / factorial(x);
}

export function ganador(home: string, away: string) {
  const puntos = predictPoints(home, away);

  if (puntos[0] > puntos[1]) return home;
  return away;
}

// console.log(
//     predictPoints("Argentina", "Brazil"),
//     poissonDistribution(1.9419295839048925),
//     poissonDistribution(2.0238195438094437)
// );
// console.log(["2.2356147635326007", "0.5922397535606193"]);
// console.log(
//     fortalezaPorEquipo["England"].goalsScored,
//     fortalezaPorEquipo["Brazil"].goalsConceded,
//     fortalezaPorEquipo["England"].goalsScored * fortalezaPorEquipo["Brazil"].goalsConceded
// );
// predictPoints("England", "Brazil");
// console.table(fortalezaPorEquipo);
