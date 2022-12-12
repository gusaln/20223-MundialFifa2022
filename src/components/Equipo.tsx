import { groupBy, keyBy } from "lodash";
import { useMemo, useState } from "react";
import flags from "../data/flags";
import { useTorneoContext } from "../useTorneoContext";

interface Props {
  isCampeon?: boolean;
  isGanador?: boolean;
  resultadoId: string;
}

const banderasPorEquipo = keyBy(flags, "equipo");

export function Equipo(props: Props) {
  const { getResultado, hayResultado, getEquipoDeResultado, findPartidoByEquipo, seleccionarResultado } =
    useTorneoContext();

  const className = "flex justify-center rounded text-base space-x-2 ";

  const partido = findPartidoByEquipo(props.resultadoId);
  let extra = props.isCampeon || props.isGanador ? "font-semibold py-2 " : "";
  if (props.isCampeon && props.isGanador) {
    extra = extra + "bg-yellow-400 font-lg ";
  } else if (props.isGanador) {
    extra = extra + "bg-green-400 ";
  }

  if (!partido) {
    return (
      <div className={className + extra}>
        <figure className="mr-2">
          <img src={banderasPorEquipo[getEquipoDeResultado(props.resultadoId)]?.banderaUrl} alt="bandera" />
        </figure>

        {getEquipoDeResultado(props.resultadoId)}
      </div>
    );
  }

  return (
    <div className={className + extra}>
      {hayResultado(props.resultadoId) && (
        <figure>
          <img src={banderasPorEquipo[getEquipoDeResultado(props.resultadoId)]?.banderaUrl} alt="bandera" />
        </figure>
      )}

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
