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
import { EquipoId, partidos, resultadosReales } from "./fifa";

const OFFSET = "Ganador ".length;

export function useTorneoContext() {
  const { state, dispatcher } = useContext(TorneoContext);

  const hayGanador = useCallback(
    (partidoId: string) => !!state.resultados["Ganador " + partidoId],
    [state]
  );

  const hayResultado = useCallback(
    (resultadoId: string) => !!state.resultados[resultadoId],
    [state]
  );

  const getGanador = useCallback(
    (partidoId: string) => state.resultados["Ganador " + partidoId],
    [state]
  );

  const getResultado = useCallback(
    (resultadoId: string) => state.resultados[resultadoId] || resultadoId,
    [state]
  );

  const getEquipoDeResultado = useCallback(
    (resultadoId: string) => {
      while (state.resultados[resultadoId]) {
        resultadoId = state.resultados[resultadoId];
      }

      return resultadoId;
    },
    [state]
  );

  const findPartidoByEquipo = useCallback(function (equipoId: string) {
    let partido = equipoId.includes("Partido")
      ? equipoId.substring(OFFSET)
      : equipoId;

    // console.log(equipoId, partido);

    return partidos[partido];
  }, []);

  const seleccionarResultado = useCallback(
    (resultadoId: string, equipoId: string) =>
      dispatcher({ type: "SetResultado", equipoId, resultadoId }),
    []
  );

  const resetTodo = useCallback(() => dispatcher({ type: "Reset" }), []);

  return {
    state,

    seleccionarResultado,
    resetTodo,

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
  | { type: "Reset" }
  | { type: "SetResultado"; resultadoId: string; equipoId: string };

const TorneoContext = createContext({
  state: {} as State,
  dispatcher: (() => ({})) as Dispatch<Action>,
});

const reducer: Reducer<State, Action> = function (
  state: State,
  action: Action
): State {
  if (action.type == "Reset") {
    return {
      resultados: { ...resultadosReales },
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

    console.log({ action, resultados });

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

  return (
    <TorneoContext.Provider value={value}>
      {props.children}
    </TorneoContext.Provider>
  );
}
