import React from "react";
import DefaultSubmitButton from "src/components/common/buttons/defaultSubmitButton";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";

export default function PassTile({title, imageUrl, date, ppl, number, desc, passId, status, bookingID, fee, prevBookerDate, prevBookerName, prevBookerNum}){
  return (
    <div className='mb-5 grid-col-span-full md:col-span-1'>
      <a href="/#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100">
        <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={imageUrl} alt="nature" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Booking ID: {bookingID}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Pass ID: {passId}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Date: {date}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Max Number of Accompanying Guests: {ppl}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Status: {status}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{fee=== 0 ? "" : "Fees Owed: " + fee}</p>
        </div>
      </a>
    </div>
  )
}
