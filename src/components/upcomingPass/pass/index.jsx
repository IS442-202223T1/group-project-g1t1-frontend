import React, { useEffect } from "react";
import { cancelBooking, getUpcomingBookings } from "src/api/passes";
import PassTile from "./PassTile";
/* eslint-disable no-plusplus */

function Pass() {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  
  const [upcomingBookings, setUpcomingBookings] = React.useState([]);


  useEffect(() => {
    renderUpcomingBookings();
    async function renderUpcomingBookings() {
        const result = await getUpcomingBookings(token, email);
        console.log(upcomingBookings);


        setUpcomingBookings(result);
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
      {upcomingPasses}
    </div>
  )
}

export default Pass;
