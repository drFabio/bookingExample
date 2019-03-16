import React, { useRef, useEffect, Fragment, MutableRefObject } from "react";
import L, { Map as LeafletMap, LayerGroup, Marker } from "leaflet";
import styled from "styled-components";
import { LatLng } from "../../../types";

const MapContainer = styled.section`
  min-height: 10vh;
  height: 50%;
  width: 100%;
`;

export interface MapProps {
  position?: null | LatLng;
  markers?: null | Array<LatLng>;
}
export function Map({ position, markers }: MapProps) {
  if (!position) {
    return null;
  }
  const mapContainerRef = useRef<HTMLElement>(null);
  const mapRef: MutableRefObject<LeafletMap | undefined> = useRef<LeafletMap>();
  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(position, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );
    }
  }, []);
  const positionRef: MutableRefObject<Marker<any> | undefined> = useRef<
    Marker<any>
  >();
  useEffect(() => {
    if (positionRef.current) {
      positionRef.current.setLatLng(position);
    } else {
      positionRef.current = L.marker(position)
        .bindPopup("We think you are here")
        .addTo(mapRef.current as LeafletMap);
    }
  }, [position]);

  const layerRef: MutableRefObject<LayerGroup<any> | undefined> = useRef<
    LayerGroup<any>
  >();
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current as LeafletMap);
  }, []);

  useEffect(() => {
    layerRef.current!.clearLayers();
    if (markers) {
      markers.forEach(marker => {
        L.marker(marker)
          .bindPopup(JSON.stringify(marker))
          .addTo(layerRef.current as LayerGroup);
      });
    }
  }, [markers]);

  return (
    <Fragment>
      <MapContainer ref={mapContainerRef} />
    </Fragment>
  );
}
