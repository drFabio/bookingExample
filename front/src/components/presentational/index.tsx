import styled from "styled-components";
import { space, color, fontSize, borders } from "styled-system";

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

export const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  space: [0, "0.5rem", "1rem", "1.5rem", "3rem"],
  colors: {
    text: "#717173",
    white: "#fff",
    secondary: "#0d4a23"
  },
  borderWidths: [1, 2, "0.5em", "1em", "1.5em"]
};

export const BaseButton = styled.button`
  ${space}
  ${color}
  ${fontSize}
`;

export const TextButton = styled(BaseButton)`
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme: { colors } }) => colors.secondary};
  }
`;

export const Button = styled(BaseButton).attrs({
  borderWidth: 1,
  pl: 1,
  pr: 1
})`
  ${borders}
`;
