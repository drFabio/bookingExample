import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { TextButton } from "../../../../../../../components/presentational";

export interface Property {
  id: string;
  capacity: number;
  name: string;
  city: string;
}
export interface PropertyListProps {
  fromDate: string;
  toDate: string;
  onChooseProperty(property: Property): void;
}
export function PropertyList({
  fromDate,
  toDate,
  onChooseProperty
}: PropertyListProps) {
  return (
    <Query
      variables={{ fromDate, toDate }}
      query={gql`
        query DesiredProperties($fromDate: Date!, $toDate: Date!) {
          availableProperties(start: $fromDate, end: $toDate) {
            id
            capacity
            name
            city
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.availableProperties.map((current: Property) => {
          const { id, name, city, capacity } = current;
          return (
            <div key={id}>
              <p>
                {name} , {city}, {capacity}{" "}
                <TextButton
                  onClick={e => {
                    e.preventDefault;
                    onChooseProperty(current);
                  }}
                >
                  Choose it!
                </TextButton>
              </p>
            </div>
          );
        });
      }}
    </Query>
  );
}
