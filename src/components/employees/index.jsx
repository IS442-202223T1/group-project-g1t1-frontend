/* eslint-disable no-plusplus */

import React, { useState, useEffect } from "react";
import { getAllUser } from "src/api/account";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { updateRoles } from "src/api/accountAdmin";


function Employees() {

  const token = sessionStorage.getItem("token");
  const [allUsers, setAllUsers] = useState([])
  const [editState, setEditState] = useState([])
  const users = [];

  const editRole = (index) => (e) => {
    e.preventDefault();
    const newEditState = [...editState];
    newEditState[index] = !newEditState[index];
    setEditState(newEditState);
  }

  const saveEdit = (index) => async (e) => {
    e.preventDefault();

    const newRoles = allUsers[index].roles.map((role) => role.label);
    const res = await updateRoles(token, allUsers[index].email, newRoles);
    if (res) {
      const newEditState = [...editState];
      newEditState[index] = !newEditState[index];
      setEditState(newEditState);
    }

  }

  useEffect(() => {
    renderUsers();
    async function renderUsers() {
        const allUsers = await getAllUser(token);
        allUsers.forEach((user) => {
          users.push(user);
          setEditState([...editState, false]);
        })
        setAllUsers(users);
      }
  },[]);

  const removeRole = (userIndex, roleIndex) => {
    const newUsers = [...allUsers];
    newUsers[userIndex].roles.splice(roleIndex, 1);
    setAllUsers(newUsers);
  }

  const addRole = (userIndex, role) => {
    const newUsers = [...allUsers];
    newUsers[userIndex].roles.push({label: role});
    setAllUsers(newUsers);
  }

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
              <th scope="col" className="py-3 px-6">
                Role(s)
              </th>
            </tr>
          </thead>
          <tbody>
            {
              allUsers.map((user, index) => (
                <tr className="bg-white divide-y">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                    {user.name}
                  </th>
                  <td className="py-4 px-6">
                    {user.email}
                  </td>
                  <td className="py-4 px-6">
                    {user.roles.map((role, roleIndex) => roleButton(role.label, editState[index], removeRole, index, roleIndex))}
                    {editState[index] ? (
                        Object.keys(roleColors).map((role) => (!user.roles.map((role) => role.label).includes(role) ? addRoleButton(role, addRole, index) : null))
                    ): null}
                  </td>
                  <td className="py-4 px-6">
                    {editState[index] ? (
                      <button type="button" className="bg-redPri hover:bg-redSec text-white font-bold py-2 px-4 rounded" onClick={saveEdit(index)}>
                        Save
                      </button>
                      )
                    : (
                      <button type="button" className="text-redPri hover:text-redSec font-bold py-2 px-4 rounded" onClick={editRole(index)}>
                        Edit
                      </button>
                    ) }
                  </td>
                </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

const roleColors = {
  admin: "bg-blue-200 text-blue-800",
  gop: "bg-green-200 text-green-800",
  borrower: "bg-red-200 text-red-800",
};

function roleButton(role, editState, removeRole, userIndex, roleIndex) {
  return (
    <div
      className={`${roleColors[role]} rounded-full px-2 py-1 text-xs font-medium inline-block mr-2`}
    >
      <div className="flex items-center">
        <div>{role}</div>
        {editState ? (<button type="button" onClick={() => removeRole(userIndex, roleIndex)}>
          <XMarkIcon className='h-4 w-4' />
        </button>) : null}
      </div>
    </div>
  );
}

function addRoleButton(role, addRole, userIndex) {
  const inverseRoleColors = {
    admin: "border-blue-800 text-blue-800",
    gop: "border-green-800 text-green-800",
    borrower: "border-red-800 text-red-800",
  }
  return (
    <button
      type="button"
      className={`border-2 ${inverseRoleColors[role]} rounded-full px-2 py-1 text-xs font-medium inline-block mr-2`}
      onClick={() => addRole(userIndex, role)}
    >
      +{role}
    </button>
  );
}

export default Employees;
