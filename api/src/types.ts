import { BookingManager } from './managers';

export interface Settings {
  port: number;
  graphqlPort: number;
  dbUri: string;
}

export interface Property {
  id: string;
  property_id: string;
  property_name: string;
  city: string;
  capacity: number;
}
export interface Booking extends Property {
  start: Date;
  end: Date;
}
export interface GraphqlContext {
  bookingManager: BookingManager;
}
