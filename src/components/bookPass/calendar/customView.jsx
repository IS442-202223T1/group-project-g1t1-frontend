/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useMemo } from "react"
import PropTypes from "prop-types"

import * as dates from "date-arithmetic"
import { Calendar, Views, Navigate, DateLocalizer } from "react-big-calendar"
import TimeGrid from "react-big-calendar/lib/TimeGrid"

function MyWeek({
  date,
  localizer,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  ...props
}) {
  const currRange = useMemo(
    () => MyWeek.range(date, { localizer }),
    [date, localizer]
  )

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

MyWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

MyWeek.range = (date, { localizer }) => {
  const start = date
  const end = dates.add(start, 6, "day")

  let current = start
  const range = []

  while (localizer.lte(current, end, "day")) {
    range.push(current)
    current = localizer.add(current, 1, "day")
  }

  return range
}

MyWeek.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -7, "day")

    case Navigate.NEXT:
      return localizer.add(date, 7, "day")

    default:
      return date
  }
}

MyWeek.title = (date) => date.toLocaleDateString("en-GB", { year: "numeric", month: "short" })

export default function CustomView({ localizer, events, startDate }) {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: startDate,
      views: {
        month: true,
        week: MyWeek,
      },
    }),
    []
  )

  return (
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={events}
          localizer={localizer}
          views={views}
        />
      </div>
  )
}
CustomView.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}