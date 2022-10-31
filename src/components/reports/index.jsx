import React from "react";
import "flowbite";
import YellowSubmitButton from "../common/buttons/yellowSubmitButton";

const data = [
  { year: 2022, month: "Jan", loans: 3 },
  { year: 2022, month: "Feb", loans: 5 },
  { year: 2022, month: "Mar", loans: 5 },
];
const exportCSV = () => {
  //
}
 
function Reports() {
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">View Reports</h1>
  
  <div className="py-6 container flex flex-wrap justify-between items-center mx-auto">
    <div id="dropdown" className="py-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">Filter By
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
      <li>
        <a href="/reports" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Monthly</a>
      </li>
      <li>
        <a href="/reports" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Annually</a>
      </li>
      <li>
        <a href="/reports" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Biannually</a>
      </li>
    </ul>
</div>
</div>
<div className="overflow-x-auto relative py-4">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                   Year
                </th>
                <th scope="col" className="py-3 px-6">
                    Month
                </th>
                <th scope="col" className="py-3 px-6">
                    Attraction
                </th>
                <th scope="col" className="py-3 px-6">
                    Number of Loans 
                </th>
                <th scope="col" className="py-3 px-6">
                    Number of Borrowers
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    2022
                </th>
                <td className="py-4 px-6">
                    January
                </td>
                <td className="py-4 px-6">
                    Universal Studios
                </td>
                <td className="py-4 px-6">
                    2
                </td>
                <td className="py-4 px-6">
                    4
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    2022
                </th>
                <td className="py-4 px-6">
                    February
                </td>
                <td className="py-4 px-6">
                    Singapore Bird Park
                </td>
                <td className="py-4 px-6">
                    14
                </td>
                <td className="py-4 px-6">
                    6
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    2022
                </th>
                <td className="py-4 px-6">
                    March
                </td>
                <td className="py-4 px-6">
                    Singapore Zoo - Worlds Best Rainforest Zoo
                </td>
                <td className="py-4 px-6">
                    20
                </td>
                <td className="py-4 px-6">
                    7
                </td>

                
            </tr>
        </tbody>
    </table>
</div>
<YellowSubmitButton buttonName="Export as CSV" exportCSV={exportCSV} />

     
    </div>
  )
}


export default Reports;

