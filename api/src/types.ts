import { BookingManager } from './managers';
import { Logger } from 'winston';

export type DateStr = string;

export interface Settings {
  port: number;
  graphqlPort: number;
  dbUri: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
export interface Property {
  id: string;
  name: string;
  city: string;
  capacity: number;
}
export interface Booking {
  id: string;
  start: DateStr;
  end: DateStr;
  canceled: boolean;
  property: Property;
  user: User;
}

export interface Context {
  bookingManager: BookingManager;
  logger: Logger;
}
export interface BookingDB {
  id: string;
  start: DateStr;
  end: DateStr;
  canceled: boolean;
  city: string;
  capacity: number;
  email: string;
  user_id: string;
  user_name: string;
  property_id: string;
  property_name: string;
}

export interface BookingRequest {
  start: DateStr;
  end: DateStr;
  user: string;
  property: string;
  people: number;
}
export interface Location {
  latitude: number;
  longitude: number;
}

export interface AvailablePropertiesParameters {
  start: DateStr;
  end: DateStr;
  minCapacity: number;
  location: Location;
}
