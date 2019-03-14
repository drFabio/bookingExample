import React, { ReactNode } from "react";

import { ThemeProvider } from "styled-components";
import {
  MainContainer,
  InnerContainer,
  Header
} from "./presentationalComponents";
import { theme } from "../components/presentational";

export interface MainProps {
  children: ReactNode;
}
export function Main({ children }: MainProps) {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Header>Book it!</Header>
        <InnerContainer>{children}</InnerContainer>
      </MainContainer>
    </ThemeProvider>
  );
}
