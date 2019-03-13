import React, { Fragment, useState, useEffect } from "react";
import { PropertyList, Property } from "./components/PropertyList";
import { BookingControl } from "./components/BookingControl";
import { DateRangeSelector } from "../DateRangeSelector";

const userId = "1";
export function PropertyBrowser() {
  const [location, setLocation] = useState<null | [number, number]>(null);
  const [dateRange, setDateRange] = useState<null | [string, string]>(null);
  const [selectedProperty, setProperty] = useState<null | Property>(null);
  const [allowSearch, setAllowSearch] = useState<boolean>(false);

  useEffect(() => {
    if (allowSearch && !location) {
      navigator.geolocation.getCurrentPosition(currentPosition => {
        setLocation([
          currentPosition.coords.latitude,
          currentPosition.coords.longitude
        ]);
      });
    }
  });

  const setSearch = (search: boolean) => setAllowSearch(search);
  if (!location) {
    return (
      <p>
        We need to know where you are to show properties! Click{" "}
        <button onClick={() => setSearch(true)}>here</button> to let us know
        where you are
      </p>
    );
  }
  if (!dateRange) {
    return (
      <Fragment>
        <p>We know where you want to go, but when?</p>
        <DateRangeSelector
          onChooseDate={(fromDate, toDate) => setDateRange([fromDate, toDate])}
        />
      </Fragment>
    );
  }
  const [fromDate, toDate] = dateRange;

  if (!selectedProperty) {
    return (
      <PropertyList
        fromDate={fromDate as string}
        toDate={toDate as string}
        onChooseProperty={setProperty}
      />
    );
  }
  return (
    <BookingControl
      user={userId}
      property={selectedProperty.id}
      start={fromDate}
      end={toDate}
      capacity={selectedProperty.capacity}
    />
  );
}
