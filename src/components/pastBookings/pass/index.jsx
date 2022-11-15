import React, { useState, useEffect } from "react";
import { getPastBookings } from "src/api/passes";
import PassTile from "./PassTile";
/* eslint-disable no-plusplus */

function BookingHistory() {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  
  const [pastBookings, setPastBookings] = React.useState([]);

  useEffect(() => {
    renderPastBookings();
    async function renderPastBookings() {
        const pastBookings = await getPastBookings(token, email);
        pastBookings.forEach((booking) => {
          pastBookings.push(booking);
        })
        setPastBookings(pastBookings);
      }
  },[]);

  const pastPasses = pastBookings.map((pass) => (
    <PassTile
    title={pass.membershipName} 
    imageUrl={pass.imageUrl} 
    date={pass.borrowDate} 
    desc={pass.numberOfPasses} 
    passId={pass.passId} 
    ppl={pass.maxPersonsAdmitted}
    bookingID={pass.bookingID}
    status={pass.bookingStatus}
    prevBookerName={pass.previousBookerName}
    prevBookerDate={pass.previousBookingDate}
    prevBookerNum={pass.previousBookerContactNumber}
    fee={pass.feesOwed}
    />
  ));

  return (
    <div className="w-10/12 max-w-xl mt-5 p-5 mx-auto">
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
