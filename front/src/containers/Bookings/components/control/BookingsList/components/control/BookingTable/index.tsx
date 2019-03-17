import React from "react";
import { Booking } from "../../../../../../../../types";

export interface BookingTableProps {
  data: null | Array<Booking>;
}
export function BookingTable({ data }: BookingTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>People</th>
          <th>City</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map(({ id, property, people, start, end }) => (
            <tr key={id}>
              <td>{property.name}</td>
              <td>{people}</td>
              <td>{property.city}</td>
              <td>{start}</td>
              <td>{end}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
