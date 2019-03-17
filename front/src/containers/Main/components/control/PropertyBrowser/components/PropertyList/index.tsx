import React, { Fragment } from "react";
import {
  Button,
  TextButton
} from "../../../../../../../components/presentational";
import { Property } from "../../../../../../../types";

export interface PropertyListProps {
  availableProperties: null | Array<Property>;
  onChooseProperty(property: Property): void;
}
export function PropertyList({
  availableProperties,
  onChooseProperty
}: PropertyListProps) {
  const isEmpty = !availableProperties || !availableProperties.length;

  return (
    <Fragment>
      <h3>Properties List</h3>
      {isEmpty && <p>No properties to choose from</p>}
      {!isEmpty && (
        <Fragment>
          {(availableProperties as Array<Property>).map((current: Property) => {
            const { id, name, city, capacity } = current;
            return (
              <div key={id}>
                <p>
                  {name} , {city}, {capacity}{" "}
                  <TextButton>View on Map</TextButton>
                  <Button
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      e.preventDefault();
                      onChooseProperty(current);
                    }}
                  >
                    Choose it!
                  </Button>
                </p>
              </div>
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
