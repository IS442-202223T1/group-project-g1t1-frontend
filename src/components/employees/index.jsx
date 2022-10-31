import React from "react";
import YellowSubmitButton from "../common/buttons/yellowSubmitButton";

const viewDetails = () => {
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
                    Apple Tan
                </th>
                <td className="py-4 px-6">
                    appleTan@gmail.com
                </td>
                <td className="py-4 px-6">
                    5
                </td>
                <td className="py-4 px-6">
                <YellowSubmitButton buttonName="View Details" viewDetails={viewDetails} />
                </td>
                
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    John Doe
                </th>
                <td className="py-4 px-6">
                    johnDoe@gmail.com
                </td>
                <td className="py-4 px-6">
                    3
                </td>
                <td className="py-4 px-6">
                <YellowSubmitButton buttonName="View Details" viewDetails={viewDetails} />
                </td>
                
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Jessica Tan
                </th>
                <td className="py-4 px-6">
                    jesstan@gmail.com
                </td>
                <td className="py-4 px-6">
                    2
                </td>
                <td className="py-4 px-6">
                <YellowSubmitButton buttonName="View Details" viewDetails={viewDetails} />
                </td>
                
            </tr>
        </tbody>
    </table>
</div>


    </div>
    
  )
}

export default Employees;
