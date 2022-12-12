import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  [x: string]: unknown;
}

export function Button(props: Props) {
  const { children, ...rest } = props;

  return (
    <button className="block bg-gray-900 p-4 font-mono uppercase text-gray-300" {...rest}>
      {children}
    </button>
  );
}
