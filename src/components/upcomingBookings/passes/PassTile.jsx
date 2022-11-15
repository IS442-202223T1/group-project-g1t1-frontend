import React, {useState} from "react";
import { cancelBooking } from "src/api/passes";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";
import BookingStatusBadge from "src/components/common/badges/bookingStatusBadge.jsx";


export default function PassTile({title, day, imageUrl, date, desc, passId, status, bookingID, prevBookerDate, prevBookerName, prevBookerNum}){
  const token = sessionStorage.getItem("token");
  const [present, setPresent] = useState(true);

  
  const handleCancelBooking = async (e) => {
    e.preventDefault();
    const res = await cancelBooking(token, bookingID);
    setPresent(false);
  }
  if(!present){
    return null;
  }
  return (
    <div className='mb-5'>
      <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100">
        <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imageUrl} alt="nature" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Booking ID: {bookingID}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Pass ID: {passId}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> Status: <BookingStatusBadge status={status} /></p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Date: {date}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{day=== "SUNDAY" ? "Previously Booked Date: " + prevBookerDate : ""}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{day=== "SUNDAY" ? "Previous Booker Name: " + prevBookerName : ""}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{day=== "SUNDAY" ? "Previous Booker Contact Number: " + prevBookerNum : ""}</p>
          <div className="justify-end">
            {status === "COLLECTED" ? null : <DefaultSecondaryButton buttonName="Cancel" onButtonClick={handleCancelBooking}/>}
          </div>
        </div>
      </div>
    </div>
  )
}
