import React, { Fragment, useState, useEffect } from "react";
import { PropertyBrowser } from "./components/control/PropertyBrowser";
import { BookingControl } from "./components/control/BookingControl";
import { withRouter, RouterProps } from "react-router";
import qs from "query-string";
import { Property } from "../../types";
import { Link } from "../../components/presentational";
import { useMutableRef } from "../../utils/useMutableRef";

const userId = "1";

export interface MainProps extends RouterProps {
  location: {
    search: string;
  };
}
function BaseMain({ history, location }: MainProps) {
  let searchParams: any = {};
  searchParams = qs.parse(location.search);

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
  const isMounting = useMutableRef<boolean>(true);

  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
    } else {
      if (location.search === "") {
        setAllowSearch(false);
        setGeoLocation(null);
        setCapacity(1);
        setDateRange(null);
        setProperty(null);
        setBooking(null);
      }
    }
  }, [location.search]);
  useEffect(() => {
    if (allowSearch && !geolocation) {
      navigator.geolocation.getCurrentPosition(currentPosition => {
        const { latitude, longitude } = currentPosition.coords;
        setNewLatLng(latitude, longitude);
      });
    }
  }, [allowSearch, geolocation]);

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
  const unselectPropery = () => {
    setProperty(null);
  };
  let fromDate: null | string = null;
  let toDate: null | string = null;

  if (dateRange) {
    [fromDate, toDate] = dateRange;
  }

  return (
    <Fragment>
      {!selectedProperty && (
        <PropertyBrowser
          minCapacity={minCapacity}
          location={geolocation}
          fromDate={fromDate}
          toDate={toDate}
          onCapacityChange={setNewCapacity}
          onDateRangeChange={setNewDateRange}
          onAllowSearchChange={setNewAllowSearch}
          onChooseProperty={setProperty}
        />
      )}
      {selectedProperty && !bookingId && (
        <BookingControl
          start={fromDate as string}
          end={toDate as string}
          property={selectedProperty as Property}
          people={minCapacity}
          onSucessfullBooking={setBooking}
          onGoBack={unselectPropery}
          user={userId}
        />
      )}
      {bookingId && (
        <Fragment>
          <p>Congratulations ! You sucessfully booked it!</p>
          <p>
            Check your <Link to="/bookings/">Bookings</Link>
          </p>
        </Fragment>
      )}
    </Fragment>
  );
}

export const Main = withRouter(BaseMain);
