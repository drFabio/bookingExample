import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100%;
  }
  ol, ul {
    list-style: none;
  }
  html {
    box-sizing: border-box;
    height: 100%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  #root {
    height: 100%;
  }
  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: inherit;
    &:hover {
      cursor: pointer;
      border-bottom: 1px solid inherit;
    }
  }
  *:focus {
    outline: none;
  }
`;
