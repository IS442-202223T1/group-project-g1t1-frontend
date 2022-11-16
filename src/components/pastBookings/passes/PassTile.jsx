import React from "react";
import PassStatusBadge from "src/components/common/badges/bookingStatusBadge.jsx";


export default function PassTile({title, imageUrl, date, ppl, passId, status, bookingID, fee}){
  const displayedDate = new Date(date);
  const defaultImageUrl = "https://images.unsplash.com/photo-1464059728276-d877187d61a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=cr";

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
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Status: <PassStatusBadge status={status} /></p>

        <p className="mb-3 font-normal text-gray-700">
          {
            fee=== 0 
            ? "" 
            : "Fees Owed: $" + (<span className="font-medium text-black">fee.toFixed(2)</span>)
          }
        </p>
      </div>
    </div>
  )
}
