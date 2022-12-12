import { Button } from "./Button";
import { useTorneoContext } from "../useTorneoContext";

export function Acciones() {
  const { predecirTorneo, resetOctavos, resetCuartos, resetSemi } = useTorneoContext();

  return (
    <div className="flex justify-items-start space-x-4">
      <Button onClick={predecirTorneo}>Predecir puestos</Button>
      <Button onClick={resetOctavos}>Reset a octavos</Button>
      <Button onClick={resetCuartos}>Reset a cuartos</Button>
      <Button onClick={resetSemi}>Reset a semifinal</Button>
    </div>
  );
}
