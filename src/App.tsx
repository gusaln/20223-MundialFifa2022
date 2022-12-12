import { ReactNode } from "react";
import "./App.css";
import { Acciones } from "./components/Acciones";
import { partidos, torneo } from "./fifa";
import { Partido } from "./components/Partido";
import { TorneoContextProvider } from "./useTorneoContext";

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

function App() {
  return (
    <TorneoContextProvider>
      <div className="m-auto w-full space-y-8 pt-2 md:w-11/12 md:pt-4 lg:w-10/12 lg:pt-8">
        <Acciones />

        {torneo.map((fase) => (
          <Fase
            key={fase.nombre}
            fase={fase.nombre}
            cols={fase.partidos.length as any}
          >
            {fase.partidos.map((partido) => (
              <Partido key={partido} partido={partidos[partido]} />
            ))}
          </Fase>
        ))}
      </div>
    </TorneoContextProvider>
  );
}

export default App;
