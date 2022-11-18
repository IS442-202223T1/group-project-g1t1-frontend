import React, { useState, useEffect } from "react";
import { getMonthlyReport } from "src/api/dashboard";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";

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

function AllReport() {
  const token = sessionStorage.getItem("token");
  const [monthlyData, setMonthlyData] = useState([]);
  const [timePeriod, setTimePeriod] = useState(new Date());
  useEffect(() => {
    renderMonthlyData();
    async function renderMonthlyData() {
      const monthlyDataRes = await getMonthlyReport(token, timePeriod.getFullYear());
      setMonthlyData(monthlyDataRes);
    }
  }, [timePeriod]);

  const downloadMonthlyReportCSV = async (e) => {
    e.preventDefault();
    const res = await getMonthlyReport(token);
    const headers = ["month,year,number of loans,number of borrowers"];
    const monthlyCSV = monthlyData.reduce((acc, row) => {
      const { month, year, numberOfLoans, numberOfBorrowers } = row;
      acc.push([month, year, numberOfLoans, numberOfBorrowers].join(","));
      return acc;
    }, []);
    downloadFile({
      data: [...headers, ...monthlyCSV].join("\n"),
      fileName: "monthly_report.csv",
      fileType: "text/csv",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg md:p-8">
      <div className="flex space-x-4 items-center mb-6">
        <p className="font-medium">Time Period: </p>
        <input
          type="number"
          min="1900"
          max={new Date().getFullYear() + 1}
          step="1"
          className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm border-gray-300 p-2.5"
          onChange={(e) => setTimePeriod(new Date(e.target.value))}
          value={timePeriod.toLocaleDateString("default", { year: "numeric" })}
        />
      </div>
      <div className="shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                Month
              </th>
              <th scope="col" className="py-3 px-6">
                Year
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                No. Of Loans
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                No. Of Borrowers
              </th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((data) => (
              <tr className="bg-white divide-y">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100"
                >
                  {data.month}
                </th>
                <td className="py-4 px-6">{data.year}</td>
                <td className="py-4 px-6 bg-gray-100">{data.numberOfLoans}</td>
                <td className="py-4 px-6 bg-gray-100">{data.numberOfBorrowers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DefaultSecondaryButton buttonName="Export CSV" onButtonClick={downloadMonthlyReportCSV} />
    </div>
  );
}

export default AllReport;
