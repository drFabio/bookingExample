import React, { Fragment, useState } from "react";
import { CapacitySelector } from "./components/CapacitySelector";
import { PropertyList } from "./components/PropertyList";
import { DateRangeSelector } from "../../../../../components/control/DateRangeSelector";
import { MarkersMap } from "../../../../../components/control/MarkersMap";
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
  const [focusedProperty, setPropertyFocus] = useState<null | Property>(null);
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
          availableProperties.forEach(({ location, name, city, id }) => {
            const { latitude, longitude } = location;
            const popupText = `${name} at ${city}`;
            markers.push({ id, location: [latitude, longitude], popupText });
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
                <MarkersMap
                  focusedMarker={focusedProperty ? focusedProperty.id : null}
                  position={location as LatLng}
                  markers={markers}
                />
                <Container>
                  <PropertyList
                    onChooseProperty={onChooseProperty}
                    onFocusProperty={setPropertyFocus}
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
