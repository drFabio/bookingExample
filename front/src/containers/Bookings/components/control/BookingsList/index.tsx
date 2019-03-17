import React from "react";
import { UserBookingsQuery } from "./queries/UserBookingsQuery";
import { BookingTable } from "./components/control/BookingTable";
import { Booking } from "../../../../../types";

export function BookingsList({ user }: { user: string }) {
  return (
    <UserBookingsQuery user={user}>
      {({ loading, data, error }) => {
        if (!loading && !error && data) {
          return <BookingTable data={data.userBookings as Array<Booking>} />;
        }
        return null;
      }}
    </UserBookingsQuery>
  );
}
