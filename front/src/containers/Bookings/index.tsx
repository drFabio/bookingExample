import React from "react";
import { BookingsList } from "./components/control/BookingsList";

const user = "1";
export function Bookings() {
  return <BookingsList user={user} />;
}
