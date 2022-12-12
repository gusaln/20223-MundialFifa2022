import { Button } from "./Button";
import { useTorneoContext } from "../useTorneoContext";

export function Acciones() {
  const { resetTodo: reset } = useTorneoContext();

  return (
    <div className="flex justify-items-start space-x-4">
      <Button onClick={reset}>Reset selección</Button>
    </div>
  );
}
