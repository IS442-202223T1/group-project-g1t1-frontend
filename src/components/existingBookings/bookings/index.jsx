import React, { useEffect, useState } from "react";
import { getBookingsByEmail } from "src/api/gop";
import BookingTile from "./BookingTile";
import SearchBar from "./searchBar";

function Bookings() {
  const token = sessionStorage.getItem("token");
  const [bookings, setBookings] = useState([]);
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const confirmedBookings = bookings.map((booking) => (
    <BookingTile
      bookingID={booking.bookingId}
      corporatePassID={booking.corporatePass.id}
      borrowerName={booking.borrower.email}
      attractionName={booking.corporatePass.membership.membershipName}
      date={booking.borrowDate}
      status={booking.bookingStatus}
      feesOwed={booking.feesOwed}
    />
  ));

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const searchForBorrower = async (e) => {
    e.preventDefault();
    renderBookings();
    async function renderBookings() {
      if (email.length !== 0) {
        setErrorText("");
        const bookingsFromApi = await getBookingsByEmail(token, email);
        setBookings(bookingsFromApi);
      } else {
        setErrorText("Please enter an email");
      }
    }
  };

  useEffect(() => {
    renderBookings();
    async function renderBookings() {
      const bookingsFromApi = await getBookingsByEmail(token, email);
      setBookings(bookingsFromApi);
    }
  }, []);

  return (
    <div className="w-10/12 max-w-5xl mt-5 p-5 mx-auto">
      <SearchBar
        handleSubmitButtonClick={searchForBorrower}
        handleInputChange={handleEmailChange}
      />
      <div>{errorText.length === 0 ? null : errorText}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {confirmedBookings.length === 0 ? (
          <div className="flex justify-center">
            <span className="text-center text-lg font-medium">No Existing Bookings Found</span>
          </div>
        ) : (
          confirmedBookings
        )}
      </div>
    </div>
  );
}

export default Bookings;
