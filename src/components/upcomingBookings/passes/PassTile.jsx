import React, {useState} from "react";
import { cancelBooking } from "src/api/passes";
import BookingStatusBadge from "src/components/common/badges/bookingStatusBadge.jsx";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";

export default function PassTile({title, day, imageUrl, date, ppl, passId, status, bookingID, prevBookerDate, prevBookerName, prevBookerNum}){
  const token = sessionStorage.getItem("token");
  const displayedDate = new Date(date);
  const displayedPrevBookerDate = new Date(prevBookerDate);
  const defaultImageUrl = "https://images.unsplash.com/photo-1464059728276-d877187d61a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=cr";
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
    <div className='mb-5 rounded-lg flex flex-col md:flex-row border hover:shadow-lg'>
      <img className="object-cover w-full h-96 rounded-t-lg overflow-hidden md:w-60 md:h-auto md:rounded-none md:rounded-l-lg" src={(imageUrl === null || imageUrl === "") ? defaultImageUrl : imageUrl} alt="nature" />
      <div className="flex flex-col justify-between p-4 md:ml-5 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p className="mb-3 font-normal text-gray-700">
          Booking ID: <span className="font-medium text-black">{bookingID}</span>
        </p>
        <p className="mb-3 font-normal text-gray-700">
          Pass ID: <span className="font-medium text-black">{passId}</span>
        </p>
        <p className="mb-3 font-normal text-gray-700">
          Date: <span className="font-medium text-black">{displayedDate.toDateString()}</span>
        </p>
        <p className="mb-3 font-normal text-gray-700">
          Pass Admits: <span className="font-medium text-black">{ppl} Pax</span>
        </p>
        <p className="mb-3 font-normal text-gray-700">
          Status: <BookingStatusBadge status={status} />
        </p>
        {
          day === "SUNDAY"
          ? (
            <>
              <p className="mb-3 font-normal text-gray-700">
                Previously Booked Date: <span className="font-medium text-black">{displayedPrevBookerDate.toDateString()}</span>
              </p>
              <p className="mb-3 font-normal text-gray-700">
                Previous Booker Name: <span className="font-medium text-black">{prevBookerName}</span>
              </p>
              <p className="mb-3 font-normal text-gray-700">
                Previous Booker Contact Number: <span className="font-medium text-black">{prevBookerNum}</span>
              </p>
            </>
          )
          : null
        }
        
        {status === "CONFIRMED" && <div><DefaultSecondaryButton buttonName="Cancel Booking" onButtonClick={handleCancelBooking}/></div>}
      </div>
    </div>
  )
}
