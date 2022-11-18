import React, { useState, useEffect } from "react";
import { getEmployeeReportByPeriod } from "src/api/dashboard";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";
import { subMonths } from "date-fns";

const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType });

  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

function BiannualReport() {
  const token = sessionStorage.getItem("token");
  const [employeeData, setEmployeeData] = useState([]);
  const currDate = new Date();
  const [startPeriod, setStartPeriod] = useState(subMonths(currDate, 5));
  const [endPeriod, setEndPeriod] = useState(currDate);
  useEffect(() => {
    renderEmployeeData();
    async function renderEmployeeData() {
      const employeeDataRes = await getEmployeeReportByPeriod(token, startPeriod, endPeriod);
      setEmployeeData(employeeDataRes);
    }
  }, [startPeriod, endPeriod]);

  const downloadBiAnnualReportCSV = async (e) => {
    e.preventDefault();
    const headers = ["Employee Name,Employee Email,Number Of Loans,"];
    const monthlyCSV = employeeData.reduce((acc, row) => {
      const { employeeName, employeeEmail, numberOfLoans } = row;
      acc.push([employeeName, employeeEmail, numberOfLoans].join(","));
      return acc;
    }, []);
    downloadFile({
      data: [...headers, ...monthlyCSV].join("\n"),
      fileName: "employee_biannual_report.csv",
      fileType: "text/csv",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg md:p-8">
      <div className="flex space-x-4 items-center mb-6">
        <p className="font-medium">Time Period: </p>
        <input
          type="month"
          id="startPeriod"
          className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm border-gray-300 p-2.5"
          onChange={(e) => setStartPeriod(new Date(e.target.value))}
          value={startPeriod.toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit" })}
        />
        <span>To</span>
        <input
          type="month"
          id="endPeriod"
          className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm border-gray-300 p-2.5"
          onChange={(e) => setEndPeriod(new Date(e.target.value))}
          value={endPeriod.toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit" })}
        />
      </div>
      <div className="shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                Employee Name
              </th>
              <th scope="col" className="py-3 px-6">
                Employee Email
              </th>

              <th scope="col" className="py-3 px-6 bg-gray-50">
                No. Of Loans Made
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((data) => (
              <tr className="bg-white divide-y">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100"
                >
                  {data.employeeName}
                </th>
                <td className="py-4 px-6">{data.employeeEmail}</td>
                <td className="py-4 px-6 bg-gray-100">{data.numberOfLoans}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DefaultSecondaryButton buttonName="Export CSV" onButtonClick={downloadBiAnnualReportCSV} />
    </div>
  );
}

export default BiannualReport;
