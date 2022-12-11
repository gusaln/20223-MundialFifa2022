import { useState, ReactNode, createContext } from "react";
import "./App.css";
import { EquipoId, Partido, partidos, resultadosReales, torneo } from "./fifa";
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
      <div className="pb-4 text-lg italic">{fase}</div>

      <div className={`grid w-full ${styles[cols]} space-x-6`}>{children}</div>
    </div>
  );
}

interface PartidoProps {
  partido: Partido;
}

function Partido({ partido }: PartidoProps): JSX.Element {
  const { getEquipoResultado } = useTorneoContext();

  return (
    <div className="flex flex-shrink flex-grow-0 flex-col justify-center justify-items-center space-y-2 p-4 outline outline-1 outline-blue-500">
      <div className="flex-shrink text-base">
        {getEquipoResultado(partido.homeId)}
      </div>

      <div className="flex-shrink font-mono">VS</div>

      <div className="flex-shrink text-base">
        {getEquipoResultado(partido.awayId)}
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
