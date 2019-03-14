import React, { useRef, useEffect, Fragment } from "react";
import L, { LatLngExpression } from "leaflet";
import styled from "styled-components";

const MapContainer = styled.section`
  min-height: 10vh;
  height: 50%;
  width: 100%;
`;

export interface MapProps {
  position: [number, number];
}
export function Map({ position }: MapProps) {
  const mapRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = L.map(mapRef.current as HTMLElement).setView(position, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );
      L.marker(position).addTo(map);
    }
  }, []);

  return (
    <Fragment>
      <MapContainer ref={mapRef} />
    </Fragment>
  );
}
