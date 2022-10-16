import React, { useState } from "react";
import { useUpdatePassContext } from "src/contexts/updatePassContext"
import PassStatusBadge from "./statusBadge";

export default function UpdatePassDetailsBody() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { selectedPass } = useUpdatePassContext();

  const handleButtonTabClick = (index) => (e) => {
    e.preventDefault();
    setActiveTabIndex(index);
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
      <ul className="flex flex-wrap text-sm font-medium text-center bg-gray-50 rounded-t-lg border-b border-gray-200">
        {renderButtonTabs}
      </ul>
      {activeTabIndex === 0 && <AdminContent fee={selectedPass.fee} pax={selectedPass.pax} />}
      {activeTabIndex === 1 && <PassTableContent passes={selectedPass.passes} />}
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
