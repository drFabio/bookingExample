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

export interface Booking {
  id: string;
  start: string;
  end: string;
  people: number;
  property: Property;
}
export interface MarkerData {
  location: LatLng;
  popupText: string;
  id: string;
}
