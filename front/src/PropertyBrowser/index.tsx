import React, { useState, useEffect } from "react";

export function PropertyBrowser() {
  const [state, setState] = useState<{
    location: null | [number, number];
    searchLocation: boolean;
  }>({
    location: null,
    searchLocation: false
  });
  const { location, searchLocation } = state;
  useEffect(() => {
    if (searchLocation && !location) {
      navigator.geolocation.getCurrentPosition(currentPosition => {
        setState(prevState => ({
          ...prevState,
          location: [
            currentPosition.coords.latitude,
            currentPosition.coords.longitude
          ]
        }));
      });
    }
  });

  const setSearch = (search: boolean) =>
    setState(prevState => ({
      ...prevState,
      searchLocation: search
    }));
  if (!location) {
    return (
      <p>
        We need to know where you are to show properties! Click{" "}
        <button onClick={() => setSearch(true)}>here</button> to let us know
        where you are
      </p>
    );
  }
  return <h1>Oh we know where you are!</h1>;
}
