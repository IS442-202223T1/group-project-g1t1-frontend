import React, { useEffect, useState } from "react";
import { mockUpcomingPassData } from "src/utils/mocks";
import { getAllConfirmedBookings } from "src/api/gop";

import BookingTile from "./BookingTile";


function Bookings() {
    const token = sessionStorage.getItem("token");
    const [bookings, setBookings] = useState([]);
    const confirmedBookings = bookings.map((booking) => (
        <BookingTile bookingID={booking.bookingId}  borrowerName={booking.borrower.email} corporatePassID = {booking.corporatePass.id} attractionName = {booking.corporatePass.membership.membershipName}  date={booking.borrowDate} numberOfPasses={1} status = {booking.bookingStatus} />
    ));

    useEffect(() => {
        renderBookings();

        async function renderBookings() {
            const bookingsFromApi = await getAllConfirmedBookings(token);
            setBookings(bookingsFromApi);
        }
    }, []);

    return (
        <div className="w-10/12 max-w-5xl mt-5 p-5 mx-auto">
            {confirmedBookings.length === 0 ? "No Memberships Found" : confirmedBookings}
        </div>
    )
}

export default Bookings;
