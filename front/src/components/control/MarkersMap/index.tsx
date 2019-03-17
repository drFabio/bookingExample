import React, { useRef, useEffect, Fragment, MutableRefObject } from "react";
import L, { Map as LeafletMap, LayerGroup, Marker } from "leaflet";
import styled from "styled-components";
import { LatLng, MarkerData } from "../../../types";
import { hashMarkers } from "./hashMarkers";
import { PropertyMarker } from "../../../components/presentational";
import { useMutableRef } from "../../../utils/useMutableRef";

const MapContainer = styled.section`
  min-height: 35vh;
  height: 50%;
  width: 100%;
`;

export interface MapProps {
  position?: null | LatLng;
  markers?: null | Array<MarkerData>;
  focusedMarker?: null | string;
  defaultZoom?: number;
}
export function MarkersMap({
  position,
  markers,
  focusedMarker,
  defaultZoom = 13
}: MapProps) {
  if (!position) {
    return null;
  }
  const mapContainerRef = useRef<HTMLElement>(null);
  const mapRef = useMutableRef<LeafletMap>();
  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        position,
        defaultZoom
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );
    }
  }, []);
  const positionRef = useMutableRef<Marker<any>>();
  useEffect(() => {
    if (positionRef.current) {
      positionRef.current.setLatLng(position);
    } else {
      positionRef.current = L.marker(position).addTo(
        mapRef.current as LeafletMap
      );

      positionRef.current.bindPopup("We think you are here").openPopup();
    }
  }, [position]);

  const layerRef = useMutableRef<LayerGroup<any>>();
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current as LeafletMap);
  }, []);

  const markersRef = useMutableRef<Map<string, Marker>>();
  useEffect(() => {
    layerRef.current!.clearLayers();
    if (markers) {
      const bounds = [position];
      const markerMap = new Map<string, Marker>();

      markersRef.current = markerMap;
      markers.forEach(({ id, location, popupText }) => {
        bounds.push(location);
        const marker = L.marker(location, { icon: PropertyMarker });
        marker.bindPopup(popupText).addTo(layerRef.current as LayerGroup);
        markerMap.set(id, marker);
      });
      (mapRef.current as LeafletMap).fitBounds(bounds);
    }
  }, [hashMarkers(markers)]);
  useEffect(() => {
    if (focusedMarker) {
      const markersMap = markersRef.current as Map<string, Marker>;
      const markerOnMap = markersMap.get(focusedMarker) as Marker;
      (mapRef.current as LeafletMap).setView(
        markerOnMap.getLatLng(),
        defaultZoom
      );
      markerOnMap.openPopup();
    }
  }, [focusedMarker]);

  return (
    <Fragment>
      <MapContainer ref={mapContainerRef} />
    </Fragment>
  );
}
