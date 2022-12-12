import {
  createContext,
  Dispatch,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  cuartosResultados,
  EquipoId,
  getEquipoDeResultado as libGetEquipoDeResultado,
  octavosResultados,
  partidos,
  resultadosReales,
  torneo,
} from "./lib/fifa";
import { ganador, predictPoints } from "./lib/predic";

const OFFSET = "Ganador ".length;

export function useTorneoContext() {
  const { state, dispatcher } = useContext(TorneoContext);

  const hayGanador = useCallback((partidoId: string) => !!state.resultados["Ganador " + partidoId], [state]);

  const hayResultado = useCallback((resultadoId: string) => !!state.resultados[resultadoId], [state]);

  const getGanador = useCallback((partidoId: string) => state.resultados["Ganador " + partidoId], [state]);

  const getResultado = useCallback((resultadoId: string) => state.resultados[resultadoId] || resultadoId, [state]);

  const getEquipoDeResultado = useCallback(
    (resultadoId: string) => libGetEquipoDeResultado(state.resultados, resultadoId),
    [state]
  );

  const findPartidoByEquipo = useCallback(function (equipoId: string) {
    let partido = equipoId.includes("Partido") ? equipoId.substring(OFFSET) : equipoId;

    // console.log(equipoId, partido);

    return partidos[partido];
  }, []);

  const seleccionarResultado = useCallback(
    (resultadoId: string, equipoId: string) => dispatcher({ type: "SetResultado", equipoId, resultadoId }),
    []
  );

  const resetOctavos = useCallback(() => dispatcher({ type: "ResetOctavos" }), []);
  const resetCuartos = useCallback(() => dispatcher({ type: "ResetCuartos" }), []);
  const resetSemi = useCallback(() => dispatcher({ type: "ResetSemi" }), []);
  const predecirTorneo = useCallback(() => dispatcher({ type: "Predecir" }), []);

  return {
    state,

    seleccionarResultado,
    predecirTorneo,
    resetOctavos,
    resetCuartos,
    resetSemi,

    findPartidoByEquipo,

    hayGanador,
    getGanador,

    hayResultado,
    getResultado,
    getEquipoDeResultado,
  };
}

interface State {
  resultados: Record<string, EquipoId>;
}

type Action =
  | { type: "ResetOctavos" }
  | { type: "ResetCuartos" }
  | { type: "ResetSemi" }
  | { type: "SetResultado"; resultadoId: string; equipoId: string }
  | { type: "Predecir" };

const TorneoContext = createContext({
  state: {} as State,
  dispatcher: (() => ({})) as Dispatch<Action>,
});

const reducer: Reducer<State, Action> = function (state: State, action: Action): State {
  if (action.type == "ResetOctavos") {
    return {
      resultados: { ...resultadosReales },
    };
  }
  if (action.type == "ResetCuartos") {
    return {
      resultados: { ...resultadosReales, ...octavosResultados },
    };
  }
  if (action.type == "ResetSemi") {
    return {
      resultados: { ...resultadosReales, ...octavosResultados, ...cuartosResultados },
    };
  }

  if (action.type == "SetResultado") {
    const resultados = {
      ...state.resultados,
    };

    if (action.resultadoId == action.equipoId) {
      delete resultados[action.resultadoId];
    } else {
      resultados[action.resultadoId] = action.equipoId;
    }

    // console.log({ action, resultados });

    return { resultados };
  }

  if (action.type == "Predecir") {
    const resultados = {
      ...state.resultados,
    };

    let t = torneo.slice().reverse();

    for (const fase of t) {
      for (const partidoId of fase.partidos) {
        if (!resultados["Ganador " + partidoId]) {
          let p = partidos[partidoId];
          let g = ganador(libGetEquipoDeResultado(resultados, p.homeId), libGetEquipoDeResultado(resultados, p.awayId));
          console.log("Prediciendo " + partidoId, g);
          resultados["Ganador " + partidoId] = g;
        }
      }
    }

    return { resultados };
  }

  return state;
};

export function TorneoContextProvider(props: any) {
  const [state, dispatcher] = useReducer<typeof reducer>(reducer, {
    resultados: { ...resultadosReales },
  });

  const value = useMemo(
    () => ({
      state,
      dispatcher,
    }),
    [state, dispatcher]
  );

  return <TorneoContext.Provider value={value}>{props.children}</TorneoContext.Provider>;
}
