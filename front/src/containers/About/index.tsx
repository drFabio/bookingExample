import React, { Fragment } from "react";
export function About() {
  return (
    <Fragment>
      <p>This is an application done in React and Graphql</p>
      <p>
        If you want to check the public API it probably is{" "}
        <a href="http://127.0.0.1:4000/bookings">here on :4000/bookings</a> for
        the lists and{" "}
        <a href="http://127.0.0.1:4000/users/1/bookings">
          here on :4000/users/1/bookings
        </a>{" "}
        for the user listing
      </p>
    </Fragment>
  );
}
