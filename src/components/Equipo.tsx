import { useMemo, useState } from "react";
import { useTorneoContext } from "../useTorneoContext";

interface Props {
  isCampeon?: boolean;
  isGanador?: boolean;
  resultadoId: string;
}

export function Equipo(props: Props) {
  const { getResultado, hayResultado, getEquipoDeResultado, findPartidoByEquipo, seleccionarResultado } =
    useTorneoContext();

  const className = "flex justify-center rounded text-base ";

  const partido = findPartidoByEquipo(props.resultadoId);
  let extra = props.isCampeon || props.isGanador ? "font-semibold py-2 " : "";
  if (props.isCampeon && props.isGanador) {
    extra = extra + "bg-yellow-400 font-lg ";
  } else if (props.isGanador) {
    extra = extra + "bg-green-400 ";
  }

  if (!partido) {
    return <div className={className + extra}>{getEquipoDeResultado(props.resultadoId)}</div>;
  }

  return (
    <div className={className + extra}>
      <select
        className="rounded-sm bg-transparent p-1 transition-colors duration-100 ease-in hover:bg-gray-200"
        value={getResultado(props.resultadoId)}
        onChange={(ev) =>
          seleccionarResultado(props.resultadoId, ev.target.value != "" ? ev.target.value : props.resultadoId)
        }
      >
        <option hidden value={getResultado(props.resultadoId)}>
          {getEquipoDeResultado(props.resultadoId)}
        </option>

        <option className="italic" value={""}>
          Deseleccionar
        </option>

        <option value={partido.homeId}>{getEquipoDeResultado(partido.homeId)}</option>

        <option value={partido.awayId}>{getEquipoDeResultado(partido.awayId)}</option>
      </select>
    </div>
  );
}
