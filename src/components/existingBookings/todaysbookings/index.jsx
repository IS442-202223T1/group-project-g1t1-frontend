import React, { useEffect, useState } from "react";
import { getBookingsByDate } from "src/api/gop";
import BookingTile from "../bookings/BookingTile";

function TodaysBookings() {
  const token = sessionStorage.getItem("token");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    renderBookings();
    async function renderBookings() {
      const bookingsFromApi = await getBookingsByDate(token);
      setBookings(bookingsFromApi);
    }
  }, []);

  return (
    <div className="w-10/12 max-w-5xl my-5 p-5 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {bookings.length === 0 ? (
          <div className="flex justify-center col-span-full">
            <span className="text-center text-lg font-medium">No Bookings Found for Today</span>
          </div>
        ) : (
          bookings.map((booking) => (
            <BookingTile
              bookingID={booking.bookingId}
              corporatePassID={booking.corporatePass.id}
              borrowerName={booking.borrower.email}
              attractionName={booking.corporatePass.membership.membershipName}
              date={booking.borrowDate}
              status={booking.bookingStatus}
              feesOwed={booking.feesOwed}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodaysBookings;
