import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Date
  type Property {
    id: String
    name: String
    city: String
    capacity: Int
  }
  type Booking {
    property: Property
    start: Date
    end: Date
    user: User
    canceled: Boolean
  }
  type User {
    id: String
    name: String
    email: String
  }
  type Query {
    properties: [Property]
    bookings: [Booking]
  }
`;
