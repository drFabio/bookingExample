import React, { ReactNode } from "react";
import styled, { StyledComponent } from "styled-components";
import { space, color, fontSize, borders } from "styled-system";
import { Link as BaseLink } from "react-router-dom";
import L from "leaflet";
import iconUrl from "../../assets/map-marker.png";

export const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  space: [0, "0.5rem", "1rem", "1.5rem", "3rem"],
  colors: {
    text: "#717173",
    white: "#fff",
    secondary: "#0d4a23",
    muted: "#BEBEBE",
    error: "#ff0000"
  },
  borderWidths: [1, 2, "0.5em", "1em", "1.5em"]
};

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
  pl: 4,
  pr: 4,
  bg: "secondary",
  color: "white",
  fontSize: 5
})`
  ${space}
  ${color}
  grid-area: header;
`;

export const BaseButton: StyledComponent<any, any> = styled.button`
  ${space}
  ${color}
  ${fontSize}
  &:disabled {
    cursor: not-allowed;
  }
  & + ${() => BaseButton} {
    margin-left: ${({ theme: { space } }) => space[2]};
  }
`;

export const TextButton = styled(BaseButton).attrs({ color: "secondary" })`
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme: { colors } }) => colors.secondary};
  }
`;

export const Button = styled(BaseButton).attrs({
  borderWidth: 1,
  pl: 1,
  pr: 1,
  color: "secondary",
  borderStyle: "solid",
  borderColor: "secondary"
})`
  ${borders}
  &:hover:enabled {
    color: ${({ theme: { colors } }) => colors.white};
    background-color: ${({ theme: { colors } }) => colors.secondary};
  }
  &:disabled {
    color: ${({ theme: { colors } }) => colors.muted};
    border-color: ${({ theme: { colors } }) => colors.muted};
  }
`;

export const Menu = styled.nav``;
export const Link = styled(BaseLink)`
  color: inherit;
  text-decoration: underline;
  & + & {
    margin-left: ${({ theme: { space } }) => space[1]};
  }
`;

export const Container = styled.div.attrs({
  pt: 1,
  pb: 1
})`
  ${space}
  ${color}
  ${fontSize}
  ${borders}

`;

export const ErrorMessage = ({ children }: { children?: null | ReactNode }) => {
  return (
    <Container color="error">{children || "Something went wrong"}</Container>
  );
};
export const PropertyMarker = L.icon({
  iconUrl,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -25] // point from which the popup should open relative to the iconAnchor
});
