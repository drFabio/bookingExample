import { MarkerData } from "../../../types";

export function hashMarkers(markers: undefined | null | Array<MarkerData>) {
  if (!markers) return "";
  return markers.reduce((hash, curr) => {
    const [lat, lng] = curr.location;
    return `${hash},${curr.id}:[${lat}],[${lng}]`;
  }, "");
}
