import React, { useState } from "react";
import { updatePassStatus } from "src/api/gop";
import DefaultSubmitButton from "src/components/common/buttons/defaultSubmitButton";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";
import ConfirmButton from "src/components/common/buttons/confirmButton";

export default function BookingTile({bookingID, corporatePassID, borrowerName, attractionName, date, numberOfPasses, status}){
  const token = sessionStorage.getItem("token");
  const [freshStatus, setFreshStatus] = useState(status);
  const collectCard = async (e) => {
    e.preventDefault();
    const res = await updatePassStatus(token, bookingID, "collect" );
    setFreshStatus("COLLECTED");
  }

  const returnCard = async (e) => {
    e.preventDefault();
    const res = await updatePassStatus(token, bookingID, "return" );
    setFreshStatus("RETURNED");
  }

  const markCardAsLost = async (e) => {
    e.preventDefault();
    const res = await updatePassStatus(token, bookingID, "markLost" );
    setFreshStatus("DUESOWED");
  }

  
  const clearDues = async (e) => {
    e.preventDefault();
    const res = await updatePassStatus(token, bookingID, "clearDues" );
    setFreshStatus("DUESPAID");
  }

  if (freshStatus === "DUESPAID" || freshStatus ==="RETURNED") {
    return null;
  }

  return (
    <div className='mb-5'>
      <div className="flex flex-col items-center bg-white rounded-lg border shadow md:flex-row hover:shadow-lg">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{borrowerName}</h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{attractionName}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{date}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">BookingID: {bookingID}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">cardID: {corporatePassID}</p>
          <div className="justify-end">
            {freshStatus === "DUESOWED" && <DefaultSecondaryButton buttonName="Clear Dues" onButtonClick={clearDues} />}
            {freshStatus === "CONFIRMED" && <ConfirmButton buttonName="Collect Card" onButtonClick={collectCard} />}
            {freshStatus === "COLLECTED" && <DefaultSecondaryButton buttonName="Return Card" onButtonClick={returnCard} />}
            {freshStatus === "COLLECTED" && <DefaultSubmitButton buttonName="Report Lost" onButtonClick={markCardAsLost} />}
          </div>
        </div>
      </div>
    </div>
  );
}
