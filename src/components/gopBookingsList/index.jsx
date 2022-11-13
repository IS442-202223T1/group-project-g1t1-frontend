import React from "react";
import Pass from "src/components/gopBookingsList/pass";

function ConfirmedBookings() {
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">Confirmed Bookings</h1>
      <Pass />
    </div>
  )
}

export default ConfirmedBookings;