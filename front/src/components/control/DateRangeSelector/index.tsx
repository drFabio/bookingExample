import React, { Fragment, useState } from "react";
import moment from "moment";
import { TextButton } from "../../presentational";

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

  let isOrderCorrect = null;
  let isFromDateValid = false;
  if (fromDate) {
    const fromMoment = moment(fromDate);
    isFromDateValid = fromMoment.isValid();
    if (toDate) {
      const toMoment = moment(toDate);
      if (isFromDateValid && toMoment.isValid()) {
        isOrderCorrect = toMoment.isAfter(fromMoment);
      }
    }
  }
  const swapDate = () => {
    setFromDate(toDate);
    setToDate(fromDate);
  };

  const minFromDate = moment(isFromDateValid ? (fromDate as string) : today)
    .add("1", "day")
    .format(DATE_FORMAT);
  const hadDate = startDate && endDate;
  const title = hadDate
    ? `And where exactly are you going on ${fromDate} - ${toDate}`
    : "When are we going there ?";

  return (
    <Fragment>
      <p>{title}</p>
      <label htmlFor="fromDate">Start Date</label>
      <input
        required
        min={today}
        type="date"
        id="fromDate"
        value={fromDate || ""}
        onChange={({ target: { value } }) => {
          setFromDate(value);
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
          setToDate(value);
        }}
      />
      {isOrderCorrect === false && (
        <Fragment>
          <p>Your start date is AFTER your end Date</p>
          <TextButton onClick={swapDate}>Swap it!</TextButton>
        </Fragment>
      )}
      {isOrderCorrect && (
        <Fragment>
          <TextButton
            onClick={() => onChooseDate(fromDate as string, toDate as string)}
          >
            {hadDate ? "Change It!" : "Choose It!"}
          </TextButton>
        </Fragment>
      )}
    </Fragment>
  );
}
