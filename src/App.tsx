import { ReactNode, useEffect } from "react";
import "./App.css";
import { Acciones } from "./components/Acciones";
import { mundialJugadores, partidos, torneo } from "./lib/fifa";
import { Partido } from "./components/Partido";
import { TorneoContextProvider, useTorneoContext } from "./useTorneoContext";
import { Equipo } from "./components/Equipo";
import { orderBy } from "lodash";
import { Fase } from "./components/Fase";

function Campeon() {
  const { hayResultado, getEquipoDeResultado } = useTorneoContext();

  const mejorGoleador = orderBy(mundialJugadores[getEquipoDeResultado("Ganador Partido 64")], "shooting")?.at(-1);
  const mejorJugador = orderBy(mundialJugadores[getEquipoDeResultado("Ganador Partido 64")], "score")?.at(-1);

  return (
    <div className="w-full space-y-8 rounded-md border border-gray-300 px-6 py-4 shadow-lg">
      <div className="w-full space-y-4">
        <div className="text-xl font-semibold">Campeón</div>
        <Equipo isCampeon isGanador={hayResultado("Ganador Partido 64")} resultadoId="Ganador Partido 64" />
      </div>

      {hayResultado("Ganador Partido 64") && (
        <>
          <div className="w-full space-y-4">
            <div className="text-xl font-semibold">Goleador</div>
            <div>{mejorGoleador?.nombre || ""}</div>
          </div>

          <div className="w-full space-y-4">
            <div className="text-xl font-semibold">Mejor jugador</div>
            <div>{mejorJugador?.nombre || ""}</div>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <TorneoContextProvider>
      <div className="m-auto w-[90%] space-y-8 pt-2 md:w-11/12 md:pt-4 lg:w-10/12 lg:pt-8">
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
