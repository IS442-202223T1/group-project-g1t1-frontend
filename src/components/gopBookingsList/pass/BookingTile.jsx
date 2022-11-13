import React, { useState } from "react";
import { updatePassStatus } from "src/api/gop";
import DefaultSubmitButton from "src/components/common/buttons/defaultSubmitButton";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";
import ConfirmButton from "src/components/common/buttons/confirmButton";

export default function BookingTile({bookingID, borrowerName, attractionName, date, numberOfPasses, status}){
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
  if( freshStatus === "DUESOWED"){
  return (
    <div className='mb-5'>
      <a href="/#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{borrowerName}</h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{attractionName}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{date}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{numberOfPasses} Pass(es)</p>
          <div className="justify-end">
            <DefaultSecondaryButton buttonName="Clear Dues" onButtonClick={clearDues} />

          </div>
        </div>
      </a>
    </div>
  );
  }
  if(freshStatus==="CONFIRMED"){
    return (
      <div className='mb-5'>
        <a href="/#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{borrowerName}</h5>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{attractionName}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{date}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{numberOfPasses} Pass(es)</p>
            <div className="justify-end">
              <ConfirmButton buttonName="Collect Card" onButtonClick={collectCard} />
            </div>
          </div>
        </a>
      </div>
    );
    }
    if(freshStatus==="COLLECTED"){
      return (
        <div className='mb-5'>
          <a href="/#" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100">
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{borrowerName}</h5>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{attractionName}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{date}</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{numberOfPasses} Pass(es)</p>
              <div className="justify-end">
                <DefaultSecondaryButton buttonName="Return Card" onButtonClick={returnCard} />
                <DefaultSubmitButton buttonName="Report Lost" onButtonClick={markCardAsLost} />
              </div>
            </div>
          </a>
        </div>
      );
      }
  return <div/>
}
