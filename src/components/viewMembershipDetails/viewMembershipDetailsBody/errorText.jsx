import React from "react";

import "react-datepicker/dist/react-datepicker.css";




export default function ResponseText({show, statusCode, message,}) {
    console.log(show);
console.log(statusCode);
    if(show){
        if(statusCode === 200){
            // show success 
            return (
                <div>
                    <text className="bg-green-100">Your booking was successful. Enjoy your trip!</text>
                </div>
            )
        }
        if(statusCode === 409){
            // const confirmedBookings = message.map((booking) => (
            //     <BookingTile bookingID={booking.bookingId}  borrowerName={booking.borrower.email} corporatePassID = {booking.corporatePass.id} attractionName = {booking.corporatePass.membership.membershipName}  date={booking.borrowDate} numberOfPasses={1} status = {booking.bookingStatus} />
            // ));
            // show who borrowed the pass
            return(<div>
                    <text className="bg-redPri text-white">Unable to book this attraction as there are not enough passes on that day.</text>
            </div>)
        }
        if(statusCode === 400){
            // say not enough passes
            return(<div>
                    <text className="bg-redPri text-white">{message}</text>
            </div>)
        }
        return null;
    }
  return null;
}
