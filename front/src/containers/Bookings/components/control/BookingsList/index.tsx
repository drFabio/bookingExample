import React, { Fragment } from "react";
import { UserBookingsQuery } from "./queries/UserBookingsQuery";
import { BookingTable } from "./components/control/BookingTable";
import { Booking } from "../../../../../types";
import { ErrorMessage } from "../../../../../components/presentational";

export function BookingsList({ user }: { user: string }) {
  return (
    <UserBookingsQuery user={user}>
      {({ loading, data, error }) => {
        const hasContent = !loading && !error && data;
        return (
          <Fragment>
            <h3>User bookings</h3>
            {error && <ErrorMessage />}
            {hasContent && (
              <BookingTable data={data.userBookings as Array<Booking>} />
            )}
          </Fragment>
        );
      }}
    </UserBookingsQuery>
  );
}
