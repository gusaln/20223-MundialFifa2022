import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
  [x: string]: unknown;
}

export function Button(props: Props) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={
        "block bg-gray-900 p-2 font-mono text-sm uppercase text-gray-300 md:p-4 md:text-base " + (className ?? "")
      }
      {...rest}
    >
      {children}
    </button>
  );
}
