import React, { useState, useEffect } from "react";
import { cancelBooking, getUpcomingBookings } from "src/api/passes";
import PassTile from "./PassTile";
/* eslint-disable no-plusplus */

function Pass() {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  
  const [upcomingBookings, setUpcomingBookings] = React.useState([]);

  async function cancel(bookingID) {
    const cancelBookings = await cancelBooking(token,email);
    return cancelBooking;
  }

  useEffect(() => {
    renderUpcomingBookings();
    async function renderUpcomingBookings() {
        const upcomingBookings = await getUpcomingBookings(token, email);
        upcomingBookings.forEach((booking) => {
             upcomingBookings.push(booking);
        })


        setUpcomingBookings(upcomingBookings);
      }
    

  },[]);

  

  const upcomingPasses = upcomingBookings.map((pass) => (
    <PassTile
    title={pass.membershipName} 
    imageUrl={pass.imageUrl} 
    date={pass.borrowDate} 
    desc={pass.numberOfPasses} 
    passId={pass.passId} 
    bookingID={pass.bookingID}
    status={pass.bookingStatus}
    prevBookerName={pass.previousBookerName}
    prevBookerDate={pass.previousBookingDate}
    prevBookerNum={pass.previousBookerContactNumber}
    day={pass.borrowDay}
    cancel={cancel(pass.bookingID)}
    />
  ));

  return (
    <div className="w-10/12 max-w-xl mt-5 p-5 mx-auto">
      {upcomingPasses}
    </div>
  )
}

export default Pass;
