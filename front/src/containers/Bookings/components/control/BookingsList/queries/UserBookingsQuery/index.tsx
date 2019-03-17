import React from "react";
import { Query, QueryProps } from "react-apollo";
import gql from "graphql-tag";

export interface UserBookingsQueryProps {
  user: string;
  children: QueryProps["children"];
}
export function UserBookingsQuery({ user, children }: UserBookingsQueryProps) {
  const variables = { user };
  return (
    <Query
      variables={variables}
      query={gql`
        query UserBookings($user: ID!) {
          userBookings(user: $user) {
            id
            start
            end
            people
            property {
              capacity
              name
              city
            }
          }
        }
      `}
    >
      {children}
    </Query>
  );
}
