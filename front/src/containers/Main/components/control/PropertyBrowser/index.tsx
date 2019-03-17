import React, { Fragment } from "react";
import { CapacitySelector } from "./components/CapacitySelector";
import { PropertyList } from "./components/PropertyList";
import { DateRangeSelector } from "../../../../../components/control/DateRangeSelector";
import { Map } from "../../../../../components/control/Map";
import {
  Button,
  Container,
  ErrorMessage
} from "../../../../../components/presentational";
import { Property, MarkerData, LatLng } from "../../../../../types";
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
  let markers: Array<MarkerData> = [];
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
          availableProperties.forEach(({ location, name, city }) => {
            const { latitude, longitude } = location;
            const popupText = `${name} at ${city}`;
            markers.push({ location: [latitude, longitude], popupText });
          });
        }
        return (
          <Fragment>
            {error && <ErrorMessage />}
            <Container>
              <p>
                Click{" "}
                <Button onClick={() => onAllowSearchChange(true)}>here</Button>{" "}
                to let us know where you are
              </p>
            </Container>
            {location && (
              <Fragment>
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
            )}
          </Fragment>
        );
      }}
    </PropertiesQuery>
  );
}
