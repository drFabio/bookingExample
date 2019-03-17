import React, { Fragment } from "react";
import { CapacitySelector } from "./components/CapacitySelector";
import { PropertyList } from "./components/PropertyList";
import { DateRangeSelector } from "../../../../../components/control/DateRangeSelector";
import { Map } from "../../../../../components/control/Map";
import {
  TextButton,
  Container
} from "../../../../../components/presentational";
import { Property, LatLng } from "../../../../../types";
import { PropertiesQuery } from "./queries/PropertiesQuery";

interface PropertyBrowserProps {
  fromDate: null | string;
  toDate: null | string;
  minCapacity: number;
  location: null | [number, number];
  onAllowSearchChange(allowSearch: boolean): void;
  onDateRangeChange(fromDate: string, toDate: string): void;
  onCapacityChange(minCapacity: number): void;
  onChooseProperty(property: Property): void;

  availableProperties?: [Property];
}
export function PropertyBrowser({
  onAllowSearchChange,
  location,
  fromDate,
  minCapacity,
  toDate,
  onDateRangeChange,
  onCapacityChange,
  onChooseProperty
}: PropertyBrowserProps) {
  let markers: Array<LatLng> = [];
  let availableProperties: Array<Property> = [];
  return (
    <PropertiesQuery
      location={location}
      minCapacity={minCapacity}
      fromDate={fromDate}
      toDate={toDate}
    >
      {({ loading, data, error }) => {
        if (!loading && !error && data) {
          availableProperties = data.availableProperties;
          availableProperties.forEach(({ location }) =>
            markers.push([location.latitude, location.longitude])
          );
        }
        return (
          <Fragment>
            <Container>
              <p>
                Click{" "}
                <TextButton onClick={() => onAllowSearchChange(true)}>
                  here
                </TextButton>{" "}
                to let us know where you are
              </p>
            </Container>
            <Container>
              <DateRangeSelector
                onChooseDate={onDateRangeChange}
                startDate={fromDate}
                endDate={toDate}
              />
            </Container>
            <Container>
              <CapacitySelector
                onCapacityChange={onCapacityChange}
                minCapacity={minCapacity}
              />
            </Container>
            <Map position={location as LatLng} markers={markers} />
            <Container>
              <PropertyList
                onChooseProperty={onChooseProperty}
                availableProperties={availableProperties}
              />
            </Container>
          </Fragment>
        );
      }}
    </PropertiesQuery>
  );
}
