import React from "react";
import { Query, QueryProps } from "react-apollo";
import gql from "graphql-tag";

export interface Property {
  id: string;
  capacity: number;
  name: string;
  city: string;
}
export interface PropertyListProps {
  fromDate: null | string;
  toDate: null | string;
  minCapacity: null | number;
  location: null | [number, number];
  children: QueryProps["children"];
}
export function PropertiesQuery({
  fromDate,
  toDate,
  minCapacity,
  children,
  location
}: PropertyListProps) {
  let variables = {};
  const skip = !fromDate || !toDate || !minCapacity || !location;
  if (!skip) {
    const [latitude, longitude] = location as [number, number];
    variables = {
      fromDate,
      toDate,
      minCapacity,
      location: { latitude, longitude }
    };
  }
  return (
    <Query
      variables={variables}
      skip={skip}
      query={gql`
        query DesiredProperties(
          $fromDate: Date!
          $toDate: Date!
          $minCapacity: Int!
          $location: Location!
        ) {
          availableProperties(
            start: $fromDate
            end: $toDate
            minCapacity: $minCapacity
            location: $location
          ) {
            id
            capacity
            name
            city
            location {
              latitude
              longitude
            }
          }
        }
      `}
    >
      {children}
    </Query>
  );
}
