import React, { ReactNode } from "react";

export interface MainProps {
  children: ReactNode;
}
export function Main({ children }: MainProps) {
  return <div>{children}</div>;
}
