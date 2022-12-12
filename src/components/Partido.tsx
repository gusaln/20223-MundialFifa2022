import { useEffect } from "react";
import { Partido } from "../lib/fifa";
import { useTorneoContext } from "../useTorneoContext";
import { Equipo } from "./Equipo";

interface PartidoProps {
  partido: Partido;
}

export function Partido({ partido }: PartidoProps): JSX.Element {
  const { state, hayGanador, getGanador, getEquipoDeResultado } = useTorneoContext();

  const ganador = getEquipoDeResultado(getGanador(partido.partidoId));

  let extra = hayGanador(partido.partidoId) ? "outline " : "outline-dashed ";
  if (state.predicciones[partido.partidoId]) {
    extra = extra + "bg-blue-600 ";
  }

  // useEffect(() => {
  //   console.log(partido.partidoId, partido.homeId, partido.awayId, ganador);
  // }, [ganador]);

  return (
    <div className={"space-y-2 rounded-md p-4 outline-2 outline-blue-500 " + extra}>
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
        <Equipo isGanador={ganador == getEquipoDeResultado(partido.homeId)} resultadoId={partido.homeId} />

        <div className="flex justify-center justify-items-center pt-1 font-mono">VS</div>

        <Equipo isGanador={ganador == getEquipoDeResultado(partido.awayId)} resultadoId={partido.awayId} />
      </div>
    </div>
  );
}
