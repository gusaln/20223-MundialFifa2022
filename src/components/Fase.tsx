import { ReactNode } from "react";

interface FaseProps {
  fase: string;
  cols?: 1 | 2 | 4 | 8;
  children: ReactNode;
}

export function Fase({ fase, cols = 1, children }: FaseProps) {
  const styles = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    8: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8",
  };

  return (
    <div className="w-full rounded-md border border-gray-300 px-6 py-4 ">
      <div className="pb-4 italic">{fase}</div>

      <div className={`grid w-full gap-2 ${styles[cols]}`}>{children}</div>
    </div>
  );
}
