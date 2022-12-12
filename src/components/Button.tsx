import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  [x: string]: unknown;
}

export function Button(props: Props) {
  const { children, ...rest } = props;

  return (
    <button className="block bg-gray-900 p-2 font-mono text-sm uppercase text-gray-300 md:p-4 md:text-base" {...rest}>
      {children}
    </button>
  );
}
