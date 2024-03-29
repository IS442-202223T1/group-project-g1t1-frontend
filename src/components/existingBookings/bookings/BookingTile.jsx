import React, { useState } from "react";
import { updatePassStatus } from "src/api/gop";
import DefaultSubmitButton from "src/components/common/buttons/defaultSubmitButton";
import FullSecondaryButton from "src/components/common/buttons/defaultSecondaryButton/fullSecondaryButton";
import ExpandableSecondaryButton from "src/components/common/buttons/defaultSecondaryButton/expandableSecondaryButton";
import ExpandableConfirmButton from "src/components/common/buttons/confirmButton/expandableConfirmButton";

export default function BookingTile({
  bookingID,
  corporatePassID,
  borrowerName,
  attractionName,
  date,
  status,
  feesOwed,
}) {
  const token = sessionStorage.getItem("token");
  const displayedDate = new Date(date);
  const [freshStatus, setFreshStatus] = useState(status);
  const collectCard = async (e) => {
    e.preventDefault();
    const res = await updatePassStatus(token, bookingID, "collect");
    setFreshStatus("COLLECTED");
  };

  const returnCard = async (e) => {
    e.preventDefault();
    const res = await updatePassStatus(token, bookingID, "return");
    setFreshStatus("RETURNED");
  };

  const markCardAsLost = async (e) => {
    e.preventDefault();
    const res = await updatePassStatus(token, bookingID, "markLost");
    setFreshStatus("DUESOWED");
  };

  const clearDues = async (e) => {
    e.preventDefault();
    const res = await updatePassStatus(token, bookingID, "clearDues");
    setFreshStatus("DUESPAID");
  };

  if (freshStatus === "DUESPAID" || freshStatus === "RETURNED") {
    return null;
  }

  const renderButtons = () => {
    switch (freshStatus) {
      case "DUESOWED":
        return <ExpandableSecondaryButton buttonName="Clear Dues" onButtonClick={clearDues} />;
      case "CONFIRMED":
        return <ExpandableConfirmButton buttonName="Collect Card" onButtonClick={collectCard} />;
      case "COLLECTED":
        return (
          <>
            <FullSecondaryButton buttonName="Return Card" onButtonClick={returnCard} />
            <DefaultSubmitButton buttonName="Report Lost" onButtonClick={markCardAsLost} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-col w-full items-center bg-white rounded-lg border shadow hover:shadow-lg">
      <div className="flex flex-col p-4 leading-normal">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {borrowerName}
        </h5>
        <p className="mb-3 font-normal text-gray-700">
          Attraction Name: <span className="font-medium text-black">{attractionName}</span>
        </p>
        <p className="mb-3 font-normal text-gray-700">
          Date:{" "}
          <span className="font-medium text-black">
            {displayedDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              weekday: "short",
            })}
          </span>
        </p>
        <p className="mb-3 font-normal text-gray-700">
          Booking ID: <span className="font-medium text-black">{bookingID}</span>
        </p>
        <p className="mb-3 font-normal text-gray-700">
          Pass ID: <span className="font-medium text-black">{corporatePassID}</span>
        </p>
        {
          status === "DUESOWED" 
          ? (
            <p className="mb-3 font-normal text-gray-700">
              Dues Owed: <span className="font-medium text-black">${feesOwed.toFixed(2)}</span>
            </p>
          ) 
          : null
         }
      </div>
      <div className="grid grid-cols-1 gap-4 p-4">
        {renderButtons()}
      </div>
    </div>
  );
}
