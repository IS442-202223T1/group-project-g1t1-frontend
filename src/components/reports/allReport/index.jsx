import React, { useState, useEffect } from "react";
import { getMonthlyReport } from "src/api/dashboard";

function AllReport() {

  const token = sessionStorage.getItem("token");
  const [ monthlyData, setMonthlyData ] = useState([]);
  useEffect(() => {
    renderMonthlyData();
    async function renderMonthlyData() {
      const monthlyDataRes = await getMonthlyReport(token);
      setMonthlyData(monthlyDataRes);
  }
},[]);  

return (
  <div className="p-4 bg-white rounded-lg md:p-8">
      <div className="shadow-md sm:rounded-lg">
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
            {
              monthlyData.map((data) => 
                <tr className="bg-white divide-y">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                    {data.month}
                  </th>
                  <td className="py-4 px-6">
                    {data.year}
                  </td>
                  <td className="py-4 px-6 bg-gray-100">
                    {data.numberOfLoans}
                  </td>
                  <td className="py-4 px-6 bg-gray-100">
                    {data.numberOfBorrowers}
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

export default AllReport;
