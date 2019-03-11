import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	body {
			margin: 0;
	}
	ol, ul {
		list-style: none;
	}
	html {
		box-sizing: border-box;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
`;
