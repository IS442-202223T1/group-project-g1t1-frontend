import React from "react";
import Bookings from "./bookings";

function ExistingBookings() {
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">View All Existing Bookings</h1>
      <Bookings />
    </div>
  )
}

export default ExistingBookings;