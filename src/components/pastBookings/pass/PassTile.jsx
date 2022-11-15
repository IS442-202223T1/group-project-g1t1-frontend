import React from "react";
import PassStatusBadge from "src/components/updateMembershipDetails/updateMembershipDetailsBody/statusBadge";

export default function PassTile({title, imageUrl, date, ppl, passId, status, bookingID, fee, prevBookerDate, prevBookerName, prevBookerNum}){
  return (
    <div className='mb-5 grid-col-span-full md:col-span-1 rounded-lg flex border hover:shadow-lg'>
      <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imageUrl} alt="nature" />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Booking ID: {bookingID}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Pass ID: {passId}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Date: {date}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Max Number of Accompanying Guests: {ppl}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Status: <PassStatusBadge status={status} /></p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{fee=== 0 ? "" : "Fees Owed: " + fee}</p>
      </div>
    </div>
  )
}
