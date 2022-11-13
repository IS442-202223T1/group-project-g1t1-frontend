import React from "react";
import DefaultSubmitButton from "src/components/common/buttons/defaultSubmitButton";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";
import ConfirmButton from "src/components/common/buttons/confirmButton";

export default function BookingTile({borrowerName, attractionName, date, numberOfPasses, status}){
  return (
    <div className='mb-5'>
      <a href="/#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{borrowerName}</h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{attractionName}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{date}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{numberOfPasses} Pass(es)</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{status}</p>
          <div className="justify-end">
            {status==="CONFIRMED" ? <ConfirmButton buttonName="Collect Card" onButtonClick="" /> : <DefaultSecondaryButton buttonName="Return Card" onButtonClick="" />}
            {status==="COLLECTED" ? <DefaultSubmitButton buttonName="Report Lost" onButtonClick="" /> : <div/>}
          </div>
        </div>
      </a>
    </div>
  )
}
