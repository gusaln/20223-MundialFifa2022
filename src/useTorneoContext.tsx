import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
  useRef,
} from "react";
import { EquipoId, resultadosReales } from "./fifa";

export function useTorneoContext() {
  const { state, dispatcher } = useContext(TorneoContext);

  function hayGanador(partidoId: string) {
    return !!state.resultados["Ganador " + partidoId];
  }

  function getGanador(partidoId: string) {
    return state.resultados["Ganador " + partidoId];
  }

  function getEquipoResultado(equipoId: string) {
    return state.resultados[equipoId] || equipoId;
  }

  function participantesDe(partidoId: string) {
    return [];
  }

  return {
    state,

    hayGanador,
    getGanador,
    getEquipoResultado,
  };
}

interface State {
  resultados: Record<string, EquipoId>;
}

type Action = {};

const TorneoContext = createContext({
  state: {} as State,
  dispatcher: (() => ({})) as Dispatch<Action>,
});

const reducer: Reducer<State, Action> = function (
  state: State,
  action: Action
): State {
  return state;
};

export function TorneoContextProvider(props: any) {
  const [state, dispatcher] = useReducer<typeof reducer>(reducer, {
    resultados: { ...resultadosReales },
  });

  const value = useRef({
    state,
    dispatcher,
  });

  return (
    <TorneoContext.Provider value={value.current}>
      {props.children}
    </TorneoContext.Provider>
  );
}
