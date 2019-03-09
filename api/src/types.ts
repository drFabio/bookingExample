export interface Settings {
  port: number;
  graphqlPort: number;
}

export interface Booking {
  id: string;
  property_id: string;
  property_name: string;
  city: string;
}
