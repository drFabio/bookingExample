import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export function PropertyList() {
  return (
    <Query
      query={gql`
        {
          properties {
            id
            name
            city
            capacity
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.properties.map(({ id, name, city, capacity }) => (
          <div key={id}>
            <p>
              {name} , {city}, {capacity}
            </p>
          </div>
        ));
      }}
    </Query>
  );
}
