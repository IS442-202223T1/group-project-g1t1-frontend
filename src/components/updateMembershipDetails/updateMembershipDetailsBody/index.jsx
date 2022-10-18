import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUpdateMembershipContext } from "src/contexts/updateMembershipContext"
import PassStatusBadge from "./statusBadge";

export default function UpdateMembershipDetailsBody() {
  const history = useHistory();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { selectedMembership } = useUpdateMembershipContext();

  const handleButtonTabClick = (index) => (e) => {
    e.preventDefault();
    setActiveTabIndex(index);
  }

  const onClickEditButton = (e) => {
    history.push("/edit-pass");
  }

  const buttons = ["Administrative Details", "View All Passes"]

  const renderButtonTabs = buttons.map((buttonName, index) => (
    <li className="mr-2">
      <ButtonTab
        index={index}
        buttonName={buttonName}
        onClick={handleButtonTabClick(index)}
        activeTabIndex={activeTabIndex}
      />
    </li>
  ))

  return (
    <div className="w-full bg-white rounded-lg border shadow-md">
      <ul className="flex flex-wrap items-center justify-between text-sm font-medium text-center bg-gray-50 rounded-t-lg border-b border-gray-200">
        <div className="flex">
          {renderButtonTabs}
        </div>
        <EditButton onClick={onClickEditButton} />
      </ul>
      {activeTabIndex === 0 && <AdminContent fee={selectedMembership.fee} pax={selectedMembership.pax} />}
      {activeTabIndex === 1 && <PassTableContent passes={selectedMembership.passes} />}
    </div>
  )
}

function ButtonTab({index, buttonName, onClick, activeTabIndex}) {
  return (
    <button 
      type="button" 
      onClick={onClick}
      className={`inline-block p-4 ${activeTabIndex === index ? "text-blue-600" : "text-gray-600"} hover:bg-gray-100`}
    >
      {buttonName}
    </button>
  );
}

function EditButton({onClick}) {
  return (
    <button 
      type="button" 
      onClick={onClick}
      className="inline-block p-4 text-gray-600 hover:text-blue-600 hover:bg-gray-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    </button>
  );
}

function AdminContent({fee, pax}) {
  return (
    <div className="p-4 bg-white rounded-lg md:p-8" >
      <ul className="divide-y divide-gray-300">
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4 justify-start">
            <div className="flex-none w-44">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Replacement Fee
              </p>
            </div>
            <div className="flex-1 items-center text-base font-semibold text-gray-900 dark:text-white">
              ${fee.toFixed(2)}
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-none w-44">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Pass Admits
              </p>
            </div>
            <div className="flex-1 items-center text-base font-semibold text-gray-900 dark:text-white">
              {pax} Person
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

function PassTableContent({passes}) {

  return (
    <div className="p-4 bg-white rounded-lg md:p-8">
      <div className="shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                Pass ID
              </th>
              <th scope="col" className="py-3 px-6">
                Pass Type
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {
              passes.map((pass) => 
                <tr className="bg-white divide-y">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                    {pass.passId}
                  </th>
                  <td className="py-4 px-6">
                    {pass.passType}
                  </td>
                  <td className="py-4 px-6 bg-gray-100">
                    <PassStatusBadge status={pass.status} />
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}