import React from "react";
import PastBookings from "src/components/pastBookings/passes";

function BookingHistory() {
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">My Booking History</h1>
      <PastBookings />
    </div>
  )
}

export default BookingHistory;
