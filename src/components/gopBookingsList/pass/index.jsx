import React, { useEffect, useState } from "react";
import { getBookingsByEmail } from "src/api/gop";

import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";
import BookingTile from "./BookingTile";



function Bookings() {
    const token = sessionStorage.getItem("token");
    const [bookings, setBookings] = useState([]);
    const [email, setEmail] = useState("")
    const confirmedBookings = bookings.map((booking) => (
        <BookingTile bookingID={booking.bookingId}  borrowerName={booking.borrower.email} corporatePassID = {booking.corporatePass.id} attractionName = {booking.corporatePass.membership.membershipName}  date={booking.borrowDate} numberOfPasses={1} status = {booking.bookingStatus} />
    ));

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
      }

    const searchForBorrower = async (e) => {
        e.preventDefault();
        renderBookings();

        async function renderBookings() {
            const bookingsFromApi = await getBookingsByEmail(token, email);
            setBookings(bookingsFromApi);
        }
      }


    return (
        <div className="w-10/12 max-w-5xl mt-5 p-5 mx-auto">
            <input type="text" id="name" onChange={handleEmailChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Search by a borrower's email" required />
            <div><DefaultSecondaryButton buttonName="Search for user" onButtonClick={searchForBorrower} /></div>
            
            {confirmedBookings.length === 0 ? "No Memberships Found" : confirmedBookings}
        </div>
    )
}

export default Bookings;
