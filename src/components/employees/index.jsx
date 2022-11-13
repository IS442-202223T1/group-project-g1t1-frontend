/* eslint-disable no-plusplus */

import React, { useState, useEffect } from "react";
import { getAllUser } from "../../api/account";


function Employees() {

    const token = sessionStorage.getItem("token");
    const [allUsers, setAllUsers] = useState([])
    const users = [];

  useEffect(() => {
    renderUsers();
    async function renderUsers() {
        const allUsers = await getAllUser(token);
        allUsers.forEach((user) => {
            users.push(user);
                for (let i = 0; i < allUsers.length; i++) {
                  if (allUsers[i].roles.label === "borrower") {
                    users.push(allUsers[i]);
                    }
                }
        })
        setAllUsers(users);
      }
  },[]);
  
return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">View Employees</h1>
    
<div className="p-4 bg-white rounded-lg md:p-8">
      <div className="shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                Employee Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              
            </tr>
          </thead>
          <tbody>
            {
              allUsers.map((user) => 
                <tr className="bg-white divide-y">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                    {user.name}
                  </th>
                  <td className="py-4 px-6">
                    {user.email}
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Employees;
