import { LatLng } from "../../../types";

export function hashMarkers(markers: undefined | null | Array<LatLng>) {
  if (!markers) return "";
  return markers.reduce((hash, curr) => {
    return `${hash},[${curr[0]}],[${curr[1]}]`;
  }, "");
}
