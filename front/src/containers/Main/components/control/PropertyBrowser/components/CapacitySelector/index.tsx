import React, { Fragment } from "react";

interface CapacitySelectorProps {
  onCapacityChange(minCapacity: number): void;
  minCapacity: number;
}
export function CapacitySelector({
  onCapacityChange,
  minCapacity
}: CapacitySelectorProps) {
  return (
    <Fragment>
      <label htmlFor="occupants">Occupants: </label>
      <input
        id="occupants"
        type="number"
        value={minCapacity}
        min="1"
        onChange={({ target: { value } }) =>
          onCapacityChange(parseInt(value, 10))
        }
      />
    </Fragment>
  );
}
