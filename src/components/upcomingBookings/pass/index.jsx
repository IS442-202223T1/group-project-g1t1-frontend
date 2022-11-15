import React, { useState, useEffect } from "react";
import { getUpcomingBookings } from "src/api/passes";
import PassTile from "./PassTile";

function Pass() {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  
  const [upcomingBookings, setUpcomingBookings] = React.useState([]);

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
    />
  ));

  return (
    <div className="w-10/12 max-w-xl mt-5 p-5 mx-auto">
      {
        upcomingPasses.length === 0 
        ? <div className="flex justify-center">
            <span className="text-center text-lg font-medium">No Upcoming Bookings Found</span> 
          </div>
        : upcomingPasses
      }
    </div>
  )
}

export default Pass;
