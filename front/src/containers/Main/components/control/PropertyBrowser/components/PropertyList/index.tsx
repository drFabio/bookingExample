import React, { Fragment } from "react";
import { TextButton } from "../../../../../../../components/presentational";
import { Property } from "../../../../../../../types";

export interface PropertyListProps {
  availableProperties: null | Array<Property>;
  onChooseProperty(property: Property): void;
}
export function PropertyList({
  availableProperties,
  onChooseProperty
}: PropertyListProps) {
  if (!availableProperties) {
    return null;
  }
  return (
    <Fragment>
      {availableProperties.map((current: Property) => {
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
      })}
    </Fragment>
  );
}
