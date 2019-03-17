import React, { Fragment } from "react";
import { Button, Container } from "../../../../../components/presentational";
import { Property } from "../../../../../types";
import { BookingMutation } from "./mutations/BookingMutation";

export interface BookingControlProps {
  user: string;
  property: Property;
  start: string;
  end: string;
  people: number;
  onSucessfullBooking(bookingId: string): void;
  onGoBack(): void;
}
export function BookingControl({
  user,
  property,
  start,
  end,
  people,
  onGoBack,
  onSucessfullBooking
}: BookingControlProps) {
  const onBooking = ({ data }: any) => {
    if (data.book.success) {
      onSucessfullBooking(data.book.id);
    }
  };
  return (
    <BookingMutation>
      {(executeBooking, { loading, error }) => (
        <Fragment>
          <Container>
            Are you sure you want to book {property.name} located in{" "}
            {property.city} for {people} from {start} to {end}?
            <Button onClick={() => onGoBack()}>Change It!</Button>
          </Container>
          <Button
            onClick={e => {
              e.preventDefault();
              const variables = {
                user,
                property: property.id,
                start,
                end,
                people
              };
              executeBooking({ variables }).then(onBooking);
            }}
          >
            {loading ? "Booking it..." : "Book it!"}
          </Button>
        </Fragment>
      )}
    </BookingMutation>
  );
}
