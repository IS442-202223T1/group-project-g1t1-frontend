import React, { useState } from "react";
import { getBookingsByEmail } from "src/api/gop";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";
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
			borrowerName={booking.borrower.email}
			corporatePassID={booking.corporatePass.id}
			attractionName={booking.corporatePass.membership.membershipName}
			date={booking.borrowDate}
			numberOfPasses={1}
			status={booking.bookingStatus}
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
				console.log(bookingsFromApi);
				setBookings(bookingsFromApi);
			} else {
        setErrorText("Please enter an email");
			}
		}
	};

	return (
		<div className="w-10/12 max-w-5xl mt-5 p-5 mx-auto">
      <SearchBar handleSubmitButtonClick={searchForBorrower} handleInputChange={handleEmailChange} />
			<div>{errorText.length === 0 ? null : errorText}</div>
			{confirmedBookings.length === 0 ? (
				<div className="flex justify-center">
					<span className="text-center text-lg font-medium">No Existing Bookings Found</span>
				</div>
			) : (
				confirmedBookings
			)}
		</div>
	);
}

export default Bookings;