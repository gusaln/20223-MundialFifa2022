import { useState, ReactNode, createContext } from "react";
import "./App.css";
import {
  EquipoId,
  Partido,
  partidos,
  partidosNombres,
  resultadosReales,
  torneo,
} from "./fifa";
import { TorneoContextProvider, useTorneoContext } from "./useTorneoContext";

interface FaseProps {
  fase: string;
  cols?: 1 | 2 | 4 | 8;
  children: ReactNode;
}

function Fase({ fase, cols = 1, children }: FaseProps) {
  const styles = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    4: "grid-cols-4",
    8: "grid-cols-8",
  };

  return (
    <div className="w-full rounded-md border border-gray-300 px-6 py-4">
      <div className="pb-4 italic">{fase}</div>

      <div className={`grid w-full ${styles[cols]} space-x-6`}>{children}</div>
    </div>
  );
}

interface PartidoProps {
  partido: Partido;
}

function Partido({ partido }: PartidoProps): JSX.Element {
  const { hayGanador, getEquipoResultado, getGanador } = useTorneoContext();

  return (
    <div className="space-y-2 rounded-md p-4 outline-dashed outline-1 outline-blue-500">
      <div>
        <small className="block text-sm italic">{partido.partidoId}</small>

        {hayGanador(partido.partidoId) && (
          <div className="text-lg">
            Ganador: {getGanador(partido.partidoId)}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 grid-rows-3 gap-1">
        <div className="flex justify-center text-base">
          {getEquipoResultado(partido.homeId)}
        </div>

        <div className="flex justify-center font-mono">VS</div>

        <div className="flex justify-center text-base">
          {getEquipoResultado(partido.awayId)}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <TorneoContextProvider>
      <div className="m-auto w-full space-y-8 pt-2 md:w-11/12 md:pt-4 lg:w-10/12 lg:pt-8">
        {torneo.map((fase) => (
          <Fase fase={fase.nombre} cols={fase.partidos.length as any}>
            {fase.partidos.map((partido) => (
              <Partido partido={partidos[partido]} />
            ))}
          </Fase>
        ))}
      </div>
    </TorneoContextProvider>
  );
}

export default App;
