export interface Location {
  latitude: number;
  longitude: number;
}
export type LatLng = [number, number];
export interface Property {
  id: string;
  capacity: number;
  name: string;
  city: string;
  location: Location;
}
