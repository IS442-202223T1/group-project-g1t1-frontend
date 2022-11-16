import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";

import { useViewMembershipContext } from "src/contexts/viewMembershipContext";
import { createNewBooking } from "src/api/borrower";
import DefaultSubmitButtonSpinner from "src/components/common/buttons/defaultSubmitButtonSpinner";

import "react-datepicker/dist/react-datepicker.css";
import ResponseText from "./errorText";




export default function ViewMembershipDetailsBody() {
  const {membershipDetails,selectedMembership } = useViewMembershipContext();


  return (
    <div className="w-full bg-white rounded-lg border shadow-md">
        <PassContent desc={membershipDetails.description} membershipName = {selectedMembership}/>
    </div>
  )
}



function PassContent({desc, membershipName}) {
    const history = useHistory();
  const defaultDescription = "No description specified";
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const [bookingDate, setBookingDate] = useState(new Date());

  const [statusCode, setStatusCode] = useState(0);
  const [message, setMessage] = useState("");
  const [borrowers, setBorrowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const startDate = new Date();
  const endDate = new Date();

  const [numberOfPasses, setNumberOfPasses] = useState(0);

  const valueSetters = {
    numberOfPasses : setNumberOfPasses,
  }

  const handleValueChange = (e) => {
    e.preventDefault();
    valueSetters[e.target.id](e.target.value);
  }


  const onButtonClicked = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await createNewBooking(token, bookingDate, email, membershipName, numberOfPasses);
    setIsLoading(false);
    if (res) {
      setStatusCode(res.status);
      if(res.status===400){
        setMessage(res.message);
      }
      else if(res.status===409){
        setBorrowers(res.message);
      }
      // history.push("/")
    }
  }

  endDate.setMonth(endDate.getMonth() + 2);
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
        <li>
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                How many passes would you like?
              </p>
        <input type="number" id="numberOfPasses" onChange={handleValueChange} className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"/>
        </li>
        <DefaultSubmitButtonSpinner buttonName="Book membership" onButtonClick={onButtonClicked} isLoading={isLoading} />
      </ul>
      <ResponseText statusCode = {statusCode} message = {message}/>
      {borrowers.length === 0 ? (
				<div/>
        ) : (
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="py-3 px-6 bg-gray-50">
                  Booker Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Booker Number
                </th>

                <th scope="col" className="py-3 px-6 bg-gray-50">
                  Pass ID
                </th>
              </tr>
            </thead>
            <tbody>
              {borrowers.map((data) => (
                <tr className="bg-white divide-y">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100"
                  >
                    {data.bookerName}
                  </th>
                  <td className="py-4 px-6">{data.contactNumber === null ? "Contact unavailable" : data.contactNumber}</td>
                  <td className="py-4 px-6 bg-gray-100">{data.passId}</td>
                </tr>
              ))}
            </tbody>
          </table>
			)}
    </div>
  );
}
