import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { space, color, fontSize } from "styled-system";

export const MainContainer = styled.main.attrs({
  fontSize: 3,
  bg: "white"
})`
  ${color}
  ${fontSize}
  font-family: verdana, sans-serif;
  line-height: 1.5;
  height: 100%;
  display: grid;
  grid-template-areas:
    "header header header "
    "left main right"
    "footer footer footer";
  grid-template-rows: 10vh 1fr 5vh;
  grid-template-columns: 1fr 8fr 1fr;
`;
export const InnerContainer = styled.div.attrs({
  pl: 3,
  pr: 3,
  color: "text",
  borderColor: "secondary"
})`
  ${space}
  ${color}
  grid-area: main;
`;
export const Header = styled.header.attrs({
  pt: 1,
  pb: 1,
  bg: "secondary",
  color: "white",
  fontSize: 5
})`
  ${space}
  ${color}
  grid-area: header;
`;
