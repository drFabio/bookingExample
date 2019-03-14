import React, { ReactNode } from "react";

import { ThemeProvider } from "styled-components";
import {
  MainContainer,
  InnerContainer,
  Header
} from "./components/presentational";
import { PropertyBrowser } from "./components/control/PropertyBrowser";
import { theme } from "../../components/presentational";

export function Main() {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Header>Book it!</Header>
        <InnerContainer>
          <PropertyBrowser />
        </InnerContainer>
      </MainContainer>
    </ThemeProvider>
  );
}
