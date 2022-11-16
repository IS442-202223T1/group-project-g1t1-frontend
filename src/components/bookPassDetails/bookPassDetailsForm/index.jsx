import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useBookPassContext } from "src/contexts/bookPassContext";
import { createNewBooking } from "src/api/borrower";
import DefaultSubmitButton from "../../common/buttons/defaultSubmitButton";
import "react-datepicker/dist/react-datepicker.css";

export default function BookPassDetailsForm() {
  const {membershipDetails, selectedMembership} = useBookPassContext();
  console.log(membershipDetails);

  return (
    <div className="w-full bg-white rounded-lg border shadow-md">
      <PassContent 
        desc={membershipDetails.description}
        address={membershipDetails.membershipAddress}
        membershipName={selectedMembership}
      />
    </div>
  )
}

function PassContent({desc, address, membershipName}) {
  const history = useHistory();
  const defaultDescription = "No description specified";
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const [bookingDate, setBookingDate] = useState(new Date());

  const [message, setMessage] = useState("");
  const [borrowers, setBorrowers] = useState([]);
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
    
    const res = await createNewBooking(token, bookingDate, email, membershipName, numberOfPasses);
    console.log(res);
    if (res) {
      if (res.status === 200) {
        alert("Booking successful!");
        history.push("/");
      }

      if (res.status === 409) {
        setBorrowers(res.message);
        setMessage("Unable to book this attraction as there are not enough passes on that day.");
      }

      if (res.status === 400) {
        setMessage("An error has occured.");
        console.log(res.message);
      }
    }
  }

  endDate.setMonth(endDate.getMonth() + 2);

  return (
    <div className="p-4 bg-white rounded-lg md:p-8" >
      <ul className="divide-y divide-gray-300 mb-2">
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
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4 justify-start">
            <div className="flex-none w-44">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Address
              </p>
            </div>
            <div className="flex-1 items-center text-base font-semibold text-gray-900 dark:text-white">
              {address}
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <p className="text-sm font-medium text-gray-900 mb-2">
            Select the date which you wish to go on
          </p>
          <DatePicker selected={bookingDate} minDate={startDate} maxDate ={endDate} onChange={(date)=>{setBookingDate(date)}}/>
        </li>
        <li className="py-3 sm:py-4">
          <p className="text-sm font-medium text-gray-900 mb-2">
            How many passes would you like?
          </p>
          <div className="w-1/4">
            <input type="number" id="numberOfPasses" onChange={handleValueChange} className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"/>
          </div>
        </li>
        <DefaultSubmitButton buttonName="Book Now" onButtonClick={onButtonClicked} />
      </ul>
      {message !== "" && <DangerAlert message={message} />}
      {borrowers.length === 0 
        ? null
        : (
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
              {
                borrowers.map((data) => (
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
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  );
}

function DangerAlert({message}) {
  return (
    <div className="p-4 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
      <span className="font-medium">{message}</span>
    </div>
  )
}