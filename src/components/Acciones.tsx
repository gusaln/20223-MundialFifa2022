import { Button } from "./Button";
import { useTorneoContext } from "../useTorneoContext";

export function Acciones() {
  const { predecirTorneo, resetOctavos, resetCuartos, resetSemi } = useTorneoContext();

  return (
    <div className="grid grid-flow-dense grid-cols-2 gap-2 md:grid-cols-4 lg:flex lg:justify-between lg:space-x-4">
      <Button className="col-span-2 mb-2 md:col-span-4 lg:mb-0" onClick={predecirTorneo}>
        Predecir puestos
      </Button>
      <div className="flex-grow-1 hidden flex-shrink-0 lg:block"></div>
      <Button onClick={resetSemi}>Reset a semifinal</Button>
      <Button onClick={resetCuartos}>Reset a cuartos</Button>
      <Button onClick={resetOctavos}>Reset a octavos</Button>
    </div>
  );
}
