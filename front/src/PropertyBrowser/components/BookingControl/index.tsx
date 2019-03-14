import React, { Fragment, ReactNode, useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const EXECUTE_BOOKING = gql`
  mutation Book(
    $user: ID!
    $property: ID!
    $start: Date!
    $end: Date!
    $people: Int!
  ) {
    book(
      user: $user
      property: $property
      start: $start
      end: $end
      people: $people
    ) {
      id
      success
    }
  }
`;
export interface BookingControlProps {
  children?: ReactNode;
  user: string;
  property: string;
  start: string;
  end: string;
  capacity: number;
  onSucessfullBooking(bookingId: string): void;
}
export function BookingControl({
  children,
  user,
  property,
  start,
  end,
  capacity,
  onSucessfullBooking
}: BookingControlProps) {
  const [people, setPeople] = useState<number>(1);
  const onBooking = ({ data }: any) => {
    if (data.book.success) {
      onSucessfullBooking(data.book.id);
    }
  };
  return (
    <Mutation mutation={EXECUTE_BOOKING}>
      {(executeBooking, { loading, error }) => (
        <Fragment>
          any
          {children}
          {error && <p>Something went wrong, please try again</p>}
          <label htmlFor="occupants">Occupants: </label>
          <input
            id="occupants"
            type="number"
            max={capacity}
            value={people}
            min="1"
            onChange={({ target: { value } }) => setPeople(parseInt(value, 10))}
          />
          <button
            onClick={e => {
              e.preventDefault();
              const variables = {
                user,
                property,
                start,
                end,
                people
              };
              executeBooking({ variables }).then(onBooking);
            }}
          >
            {loading ? "Booking it..." : "Book it!"}
          </button>
        </Fragment>
      )}
    </Mutation>
  );
}
