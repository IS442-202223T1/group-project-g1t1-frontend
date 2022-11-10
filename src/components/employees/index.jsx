import React from "react";
import DefaultSubmitButton from "../common/buttons/defaultSubmitButton";

const getEmployeeDetails = () => {
  //
}

function Employees() {
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="py-4 font-medium text-3xl">View Employees</h1>

      <div className="overflow-x-auto relative">
    <table className="py-3 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                   Employee Name
                </th>
                <th scope="col" className="py-3 px-6">
                    Email
                </th>
                <th scope="col" className="py-3 px-6">
                    Number of Loans 
                </th>
                <th scope="col" className="py-3 px-6">
                View Details
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    getName
                </th>
                <td className="py-4 px-6">
                    getEmail
                </td>
                <td className="py-4 px-6">
                    getNumberOfLoans
                </td>
                <td className="py-4 px-6">
                <DefaultSubmitButton buttonName="View Details" getEmployeeDetails={getEmployeeDetails} />
                </td>
                
            </tr>
        </tbody>
    </table>
</div>
    </div>
  )
}

export default Employees;
