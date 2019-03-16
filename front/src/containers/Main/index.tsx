import React, { Fragment, useState, useEffect } from "react";
import { PropertiesQuery } from "./components/control/PropertiesQuery";
import { PropertyBrowser } from "./components/control/PropertyBrowser";
import { withRouter, RouterProps } from "react-router";
import qs from "query-string";
import { Property } from "../../types";

export interface MainProps extends RouterProps {
  location: {
    search: string;
  };
}
function BaseMain({ history, location }: MainProps) {
  let searchParams: any = {};
  if (location) {
    searchParams = qs.parse(location.search);
  }

  let initialGeoLocation: null | [number, number] = null;
  let initialDateRange: null | [string, string] = null;
  let initialCapacity = 1;
  if (searchParams.lat && searchParams.lng) {
    initialGeoLocation = [
      parseFloat(searchParams.lat as string),
      parseFloat(searchParams.lng as string)
    ];
  }
  if (searchParams.fromDate && searchParams.toDate) {
    initialDateRange = [searchParams.fromDate, searchParams.toDate];
  }
  if (searchParams.capacity) {
    initialCapacity = parseInt(searchParams.capacity, 10);
  }
  useEffect(() => {
    if (allowSearch && !geolocation) {
      navigator.geolocation.getCurrentPosition(currentPosition => {
        const { latitude, longitude } = currentPosition.coords;
        setNewLatLng(latitude, longitude);
      });
    }
  });

  const [allowSearch, setAllowSearch] = useState<boolean>(false);
  const [geolocation, setGeoLocation] = useState<null | [number, number]>(
    initialGeoLocation
  );
  const [minCapacity, setCapacity] = useState<number>(initialCapacity);
  const [dateRange, setDateRange] = useState<null | [string, string]>(
    initialDateRange
  );
  const [selectedProperty, setProperty] = useState<null | Property>(null);
  const [bookingId, setBooking] = useState<null | string>(null);

  const addToHistory = (newData: object) => {
    history.push({
      search: qs.stringify({ ...searchParams, ...newData })
    });
  };
  const setNewAllowSearch = (allow: boolean) => {
    setAllowSearch(allow);
    setGeoLocation(null);
  };
  const setNewLatLng = (latitude: number, longitude: number) => {
    addToHistory({ lat: latitude, lng: longitude });
    setGeoLocation([latitude, longitude]);
  };
  const setNewDateRange = (fromDate: string, toDate: string) => {
    setDateRange([fromDate, toDate]);
    addToHistory({
      fromDate,
      toDate
    });
  };
  const setNewCapacity = (newCapacity: number) => {
    addToHistory({
      capacity: newCapacity
    });
    setCapacity(newCapacity);
  };
  let fromDate: null | string = null;
  let toDate: null | string = null;

  if (dateRange) {
    [fromDate, toDate] = dateRange;
  }
  const commonProps = {
    minCapacity,
    location: geolocation,
    fromDate,
    toDate
  };
  return (
    <PropertiesQuery {...commonProps}>
      {({ loading, data, error }) => (
        <PropertyBrowser
          {...commonProps}
          onCapacityChange={setNewCapacity}
          onDateRangeChange={setNewDateRange}
          onAllowSearchChange={setNewAllowSearch}
          onChooseProperty={setProperty}
          loading={loading}
          error={error}
          data={data}
        />
      )}
    </PropertiesQuery>
  );
}

export const Main = withRouter(BaseMain);
