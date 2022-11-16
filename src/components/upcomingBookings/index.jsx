import React from "react";
import Passes from "src/components/upcomingBookings/passes";

function UpcomingBookings() {
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">My Upcoming Bookings</h1>
      <Passes />
    </div>
  );
}

export default UpcomingBookings;
