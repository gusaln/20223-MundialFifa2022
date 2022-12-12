import { ReactNode } from "react";
import "./App.css";
import { Acciones } from "./components/Acciones";
import { partidos, torneo } from "./lib/fifa";
import { Partido } from "./components/Partido";
import { TorneoContextProvider, useTorneoContext } from "./useTorneoContext";
import { Equipo } from "./components/Equipo";

interface FaseProps {
  fase: string;
  importante?: boolean;
  cols?: 1 | 2 | 4 | 8;
  children: ReactNode;
}

function Fase({ importante = false, fase, cols = 1, children }: FaseProps) {
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

function Campeon() {
  const { hayResultado } = useTorneoContext();

  return (
    <div className="w-full rounded-md border border-gray-300 px-6 py-4 shadow-lg">
      <div className="pb-4 text-xl font-semibold">Campeón</div>

      <div className="grid w-full  space-x-6">
        <Equipo isCampeon isGanador={hayResultado("Ganador Partido 64")} resultadoId="Ganador Partido 64" />
      </div>
    </div>
  );
}

function App() {
  return (
    <TorneoContextProvider>
      <div className="m-auto w-full space-y-8 pt-2 md:w-11/12 md:pt-4 lg:w-10/12 lg:pt-8">
        <Acciones />

        <Campeon />

        {torneo.map((fase) => (
          <Fase key={fase.nombre} fase={fase.nombre} cols={fase.partidos.length as any}>
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
