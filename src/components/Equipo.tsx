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

function Bandera({ resultadoId }: any) {
  const { hayResultado, getEquipoDeResultado } = useTorneoContext();

  return (
    <figure className="mr-1 flex min-w-[1.5em] max-w-[2em] items-center md:mr-2">
      {banderasPorEquipo[getEquipoDeResultado(resultadoId)] && (
        <img
          className="w-full"
          // width="64px"
          // height="64px"
          src={banderasPorEquipo[getEquipoDeResultado(resultadoId)]?.banderaUrl}
          alt={"bandera " + getEquipoDeResultado(resultadoId)}
        />
      )}
    </figure>
  );
}

export function Equipo(props: Props) {
  const { getResultado, hayResultado, getEquipoDeResultado, findPartidoByEquipo, seleccionarResultado } =
    useTorneoContext();

  const className = "flex justify-center items-center rounded text-base space-x-2 h-12  ";

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
        <Bandera resultadoId={props.resultadoId} />

        {getEquipoDeResultado(props.resultadoId)}
      </div>
    );
  }

  return (
    <div className={className + extra}>
      <Bandera resultadoId={props.resultadoId} />

      <select
        className="-m-6 block rounded-sm bg-transparent p-1 px-2 transition-colors duration-100 ease-in hover:bg-gray-400"
        value={getResultado(props.resultadoId)}
        onChange={(ev) =>
          seleccionarResultado(props.resultadoId, ev.target.value != "" ? ev.target.value : props.resultadoId)
        }
      >
        <option className="whitespace-pre-wrap" hidden value={getResultado(props.resultadoId)}>
          {getEquipoDeResultado(props.resultadoId)}
        </option>

        <option className="whitespace-pre-wrap italic" value={""}>
          Deseleccionar
        </option>

        <option className="whitespace-pre-wrap" value={partido.homeId}>
          {getEquipoDeResultado(partido.homeId)}
        </option>

        <option className="whitespace-pre-wrap" value={partido.awayId}>
          {getEquipoDeResultado(partido.awayId)}
        </option>
      </select>
    </div>
  );
}
