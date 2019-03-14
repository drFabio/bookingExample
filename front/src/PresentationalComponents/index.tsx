import styled from "styled-components";
import { space, color, fontSize, borders } from "styled-system";

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
