import React, { Fragment, useState } from "react";
import moment from "moment";
import { Button } from "../../presentational";

export interface DateRangeSelectorProps {
  onChooseDate(fromDate: string, toDate: string): void;
  startDate: null | string;
  endDate: null | string;
}
export function DateRangeSelector({
  onChooseDate,
  startDate,
  endDate
}: DateRangeSelectorProps) {
  const DATE_FORMAT = "YYYY-MM-DD";
  const today = moment().format(DATE_FORMAT);
  const [fromDate, setFromDate] = useState<null | string>(startDate);
  const [toDate, setToDate] = useState<null | string>(endDate);
  const getFlags = (start: null | string, end: null | string) => {
    if (!start || !end) {
      return {
        isOrderCorrect: false,
        isStartValid: false,
        isEndValid: false
      };
    }
    const startMoment = moment(start);
    const endMoment = moment(end);
    const isStartValid = startMoment.isValid();
    const isEndValid = endMoment.isValid();
    if (!isStartValid || !isEndValid) {
      return {
        isOrderCorrect: false,
        isStartValid,
        isEndValid
      };
    }
    return {
      isOrderCorrect: endMoment.isAfter(startMoment),
      isStartValid,
      isEndValid
    };
  };
  const { isOrderCorrect, isStartValid: isFromDateValid } = getFlags(
    fromDate,
    endDate
  );

  const swapDate = () => {
    setFromDate(toDate);
    setToDate(fromDate);
  };

  const minFromDate = moment(isFromDateValid ? (fromDate as string) : today)
    .add("1", "day")
    .format(DATE_FORMAT);
  const hadDate = startDate && endDate;
  const verb = hadDate ? "change" : "set";
  return (
    <Fragment>
      <label htmlFor="fromDate">Start Date</label>
      <input
        required
        min={today}
        type="date"
        id="fromDate"
        value={fromDate || ""}
        onChange={({ target: { value } }) => {
          const { isOrderCorrect: updateRange } = getFlags(value, toDate);
          setFromDate(value);
          if (updateRange) {
            onChooseDate(value, toDate as string);
          }
        }}
      />
      <label htmlFor="toDate">End Date</label>
      <input
        type="date"
        id="toDate"
        required
        disabled={!isFromDateValid}
        min={minFromDate}
        value={toDate || ""}
        onChange={({ target: { value } }) => {
          const { isOrderCorrect: updateRange } = getFlags(fromDate, value);
          setToDate(value);
          if (updateRange) {
            onChooseDate(toDate as string, value);
          }
        }}
      />
      {isOrderCorrect === false && (
        <Fragment>
          <p>Your start date is AFTER your end Date</p>
          <Button onClick={swapDate}>Swap it!</Button>
        </Fragment>
      )}
    </Fragment>
  );
}
