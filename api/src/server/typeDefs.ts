import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Booking {
    id: String
    property_id: String
    property_name: String
    city: String
  }
  type Query {
    bookings: [Booking]
  }
`;
