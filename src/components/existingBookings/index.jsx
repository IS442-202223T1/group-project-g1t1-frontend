import React from "react";
import Bookings from "./bookings";
import TodaysBookings from "./todaysbookings";

function ExistingBookings() {
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">Today&apos;s Bookings</h1>
      <TodaysBookings />
      <h1 className="font-medium text-3xl">View All Existing Bookings</h1>
      <Bookings />
    </div>
  );
}

export default ExistingBookings;
