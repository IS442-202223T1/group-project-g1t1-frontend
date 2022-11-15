import React, { useState, useEffect } from "react";
import { getEmployeeReport } from "src/api/dashboard";

function EmployeeReport() {

  const token = sessionStorage.getItem("token");
  const timeframe = "month";
  const [ employeeData, setEmployeeData ] = useState([]);
  useEffect(() => {
    renderEmployeeData();
    async function renderEmployeeData() {
      const employeeDataRes = await getEmployeeReport(token, timeframe);
      setEmployeeData(employeeDataRes);
  }
},[]);  
  const duration = employeeData.map((data)=>data.duration);

return (
  <div className="p-4 bg-white rounded-lg md:p-8">
      <div className="shadow-md sm:rounded-lg">
     <b>Time Period: {duration[0]}</b>
        
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
            {
              employeeData.map((data) => 
                <tr className="bg-white divide-y">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                    {data.employeeName}
                  </th>
                  <td className="py-4 px-6">
                    {data.employeeEmail}
                  </td>
                  <td className="py-4 px-6 bg-gray-100">
                    {data.numberOfLoans}
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

export default EmployeeReport;
