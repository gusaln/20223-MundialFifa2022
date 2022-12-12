import { Button } from "./Button";
import { useTorneoContext } from "../useTorneoContext";

export function Acciones() {
  const { predecirTorneo, resetOctavos, resetCuartos, resetSemi } = useTorneoContext();

  return (
    <div className="grid grid-flow-dense grid-cols-2 gap-2 md:grid-cols-4 lg:flex lg:space-x-4">
      <Button onClick={predecirTorneo}>Predecir puestos</Button>
      <Button onClick={resetOctavos}>Reset a octavos</Button>
      <Button onClick={resetCuartos}>Reset a cuartos</Button>
      <Button onClick={resetSemi}>Reset a semifinal</Button>
    </div>
  );
}
