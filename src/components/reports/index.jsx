import React, { useState } from "react";
import AllReport from "./allReport";
import EmployeeReport from "./monthlyReport";
import AnnualReport from "./annualReport";
import BiannualReport from "./biannualReport";
import ButtonTab from "./buttonTab";

function Reports() {
  const buttons = ["Employee Monthly Reports", "Employee Bi-Annual Reports", "Employee Annual Reports", "Monthly Report"];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleButtonTabClick = (index) => (e) => {
    e.preventDefault();
    setActiveTabIndex(index);
  }

  const renderButtonTabs = buttons.map((buttonName, index) => (
    <li className="mr-2">
      <ButtonTab
        index={index}
        buttonName={buttonName}
        onClick={handleButtonTabClick(index)}
        activeTabIndex={activeTabIndex}
      />
    </li>
  ));

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">View Reports</h1>
      <div className="max-w-5xl mt-5 mx-auto">
      <div className="w-full bg-white rounded-lg border shadow-md">
      <ul className="flex flex-wrap items-center justify-between text-sm font-medium text-center bg-gray-50 rounded-t-lg border-b border-gray-200">
        <div className="flex">
          {renderButtonTabs}
        </div>
      </ul>
      </div>
    </div>
      {activeTabIndex === 0 ? <EmployeeReport /> : null}
      {activeTabIndex === 1 ? <BiannualReport /> : null}
      {activeTabIndex === 2 ? <AnnualReport /> : null}
      {activeTabIndex === 3 ? <AllReport /> : null}
    </div>
  )
}

export default Reports;
