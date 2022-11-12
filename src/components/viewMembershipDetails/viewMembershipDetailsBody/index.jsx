import React, { useState } from "react";
import { useViewMembershipContext } from "src/contexts/viewMembershipContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ViewMembershipDetailsBody() {
  const {membershipDetails } = useViewMembershipContext();


  return (
    <div className="w-full bg-white rounded-lg border shadow-md">
        <PassContent desc={membershipDetails.description} fee={membershipDetails.replacementFee}/>
    </div>
  )
}

function PassContent({desc, fee}) {
  const defaultDescription = "No description specified";
  const [bookingDate, setBookingDate] = useState(new Date());
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 13);
  return (
    <div className="p-4 bg-white rounded-lg md:p-8" >
      <ul className="divide-y divide-gray-300">
      <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4 justify-start">
            <div className="flex-none w-44">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Description
              </p>
            </div>
            <div className="flex-1 items-center text-base font-semibold text-gray-900 dark:text-white">
              {desc === "" ? defaultDescription : desc}
            </div>
          </div>
        </li>
        <li>
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Select the date which you wish to go on
              </p>
            <DatePicker selected={bookingDate} minDate={startDate} maxDate ={endDate} onChange={(date)=>{setBookingDate(date)}}/>
        </li>
      </ul>
    </div>
  );
}
