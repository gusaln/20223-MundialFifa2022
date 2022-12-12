import { Partido } from "../fifa";
import { useTorneoContext } from "../useTorneoContext";
import { Equipo } from "./Equipo";

interface PartidoProps {
  partido: Partido;
}

export function Partido({ partido }: PartidoProps): JSX.Element {
  const { getGanador } = useTorneoContext();

  const ganador = getGanador(partido.partidoId);

  return (
    <div className="space-y-2 rounded-md p-4 outline-dashed outline-1 outline-blue-500">
      <div>
        <small className="block text-sm italic">{partido.partidoId}</small>
        {/* 
        {hayGanador(partido.partidoId) && (
          <div className="text-lg font-semibold uppercase">
            Ganador: {getGanador(partido.partidoId)}
          </div>
        )} */}
      </div>

      <div className="space-y-2">
        <Equipo
          isGanador={ganador == partido.homeId}
          resultadoId={partido.homeId}
        />

        <div className="flex justify-center justify-items-center pt-1 font-mono">
          VS
        </div>

        <Equipo
          isGanador={ganador == partido.awayId}
          resultadoId={partido.awayId}
        />
      </div>
    </div>
  );
}
