import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Date
  type LocationResponse {
    latitude: Float
    longitude: Float
  }
  input Location {
    latitude: Float
    longitude: Float
  }
  type Property {
    id: String
    name: String
    city: String
    capacity: Int
    location: LocationResponse
  }
  type Booking {
    id: String
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
    availableProperties(
      start: Date!
      end: Date!
      minCapacity: Int!
      location: Location!
    ): [Property]
    bookings: [Booking]
  }
  interface Response {
    success: Boolean!
    id: ID
  }
  type BookResponse implements Response {
    success: Boolean!
    id: ID
    booking: Booking
  }

  type Mutation {
    book(
      user: ID!
      property: ID!
      start: Date!
      end: Date!
      people: Int!
    ): BookResponse
  }
`;
