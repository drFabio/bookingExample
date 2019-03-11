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
    bookings: [Booking]
  }
  interface Response {
    success: Boolean!
  }
  type BookResponse implements Response {
    success: Boolean!
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
