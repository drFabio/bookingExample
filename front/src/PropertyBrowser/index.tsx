import React, { Fragment, useState, useEffect } from "react";
import { PropertyList, Property } from "./components/PropertyList";
import { BookingControl } from "./components/BookingControl";
import { DateRangeSelector } from "../components/control/DateRangeSelector";
import { Map } from "../components/control/Map";

import { TextButton } from "../components/presentational";

const userId = "1";
export function PropertyBrowser() {
  const [location, setLocation] = useState<null | [number, number]>(null);
  const [dateRange, setDateRange] = useState<null | [string, string]>(null);
  const [selectedProperty, setProperty] = useState<null | Property>(null);
  const [allowSearch, setAllowSearch] = useState<boolean>(false);
  const [bookingId, setBooking] = useState<null | string>(null);

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
        <TextButton onClick={() => setSearch(true)}>here</TextButton> to let us
        know where you are
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
        <Map position={location as [number, number]} />
      </Fragment>
    );
  }
  const [fromDate, toDate] = dateRange;

  if (!selectedProperty) {
    return (
      <Fragment>
        <p>
          And where exactly are you going on {fromDate} - {toDate}{" "}
          <button
            onClick={e => {
              e.preventDefault();
              setDateRange(null);
            }}
          >
            Change
          </button>{" "}
        </p>
        <PropertyList
          fromDate={fromDate as string}
          toDate={toDate as string}
          onChooseProperty={setProperty}
        />
      </Fragment>
    );
  }
  if (!bookingId) {
    return (
      <BookingControl
        user={userId}
        property={selectedProperty.id}
        start={fromDate}
        end={toDate}
        capacity={selectedProperty.capacity}
        onSucessfullBooking={id => setBooking(id)}
      />
    );
  }
  return (
    <p>
      {`Congratulations you sucessfully booked ${
        selectedProperty.name
      } at ${fromDate}-${toDate}`}
    </p>
  );
}
