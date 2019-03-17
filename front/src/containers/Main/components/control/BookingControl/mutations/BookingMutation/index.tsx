import React from "react";
import gql from "graphql-tag";
import { Mutation, MutationProps } from "react-apollo";

const EXECUTE_BOOKING = gql`
  mutation Book(
    $user: ID!
    $property: ID!
    $start: Date!
    $end: Date!
    $people: Int!
  ) {
    book(
      user: $user
      property: $property
      start: $start
      end: $end
      people: $people
    ) {
      id
      success
    }
  }
`;
export interface BookingMutationProps {
  children: MutationProps["children"];
}
export function BookingMutation({ children }: BookingMutationProps) {
  return <Mutation mutation={EXECUTE_BOOKING}>{children}</Mutation>;
}
