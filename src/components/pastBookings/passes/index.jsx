import React, { useEffect } from "react";
import { getPastBookings } from "src/api/passes";
import PassTile from "./PassTile";

function BookingHistory() {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  
  const [pastBookings, setPastBookings] = React.useState([]);

  useEffect(() => {
    renderPastBookings();
    async function renderPastBookings() {
      const pastBookingsRes = await getPastBookings(token, email);
      setPastBookings(pastBookingsRes);
    }
  },[]);

  const pastPasses = pastBookings.map((pass) => (
    <PassTile
      title={pass.membershipName} 
      imageUrl={pass.imageUrl} 
      date={pass.borrowDate} 
      passId={pass.passId} 
      ppl={pass.maxPersonsAdmitted}
      bookingID={pass.bookingID}
      status={pass.bookingStatus}
      fee={pass.feesOwed}
    />
  ));

  return (
    <div className="w-10/12 max-w-5xl mt-5 p-5 mx-auto gap-4">
      {
        pastPasses.length === 0 
        ? <div className="flex justify-center">
            <span className="text-center text-lg font-medium">No Past Bookings Found</span> 
          </div>
        : pastPasses
      }
    </div>
  )
}

export default BookingHistory;
