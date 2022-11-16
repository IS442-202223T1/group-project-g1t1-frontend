import React, { useState, useEffect } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/20/solid";
import { getAllUser, updateRoles, disableEmployee, enableEmployee } from "src/api/accountAdmin";
import { EditIconButton, ConfirmIconButton } from "src/components/common/buttons/iconButtons";
import { deleteBookingsByBorrower } from "src/api/bookingAdmin";

function Employees() {
  const token = sessionStorage.getItem("token");
  const [allUsers, setAllUsers] = useState([]);
  const [editState, setEditState] = useState([]);

  const editRole = (index) => (e) => {
    e.preventDefault();
    const newEditState = [...editState];
    newEditState[index] = !newEditState[index];
    setEditState(newEditState);
  };

  const saveEdit = (index) => async (e) => {
    e.preventDefault();

    const newRoles = allUsers[index].roles.map((role) => role.label);
    const res = await updateRoles(token, allUsers[index].email, newRoles);
    if (res) {
      const newEditState = [...editState];
      newEditState[index] = !newEditState[index];
      setEditState(newEditState);
    }
  };

  useEffect(() => {
    renderUsers();
    async function renderUsers() {
      const users = [];
      const allUsers = await getAllUser(token);
      allUsers.forEach((user) => {
        users.push(user);
        setEditState([...editState, false]);
      });
      setAllUsers(users);
    }
  }, []);

  const removeRole = (userIndex, roleIndex) => {
    const newUsers = [...allUsers];
    newUsers[userIndex].roles.splice(roleIndex, 1);
    setAllUsers(newUsers);
  };

  const addRole = (userIndex, role) => {
    const newUsers = [...allUsers];
    newUsers[userIndex].roles.push({ label: role });
    setAllUsers(newUsers);
  };

  const disableUser = (userIndex) => async (e) => {
    e.preventDefault();
    const deleteBookingsRes = await deleteBookingsByBorrower(token, allUsers[userIndex].email);
    const disableUserRes = await disableEmployee(token, allUsers[userIndex].email);
    if (deleteBookingsRes && disableUserRes) {
      const newUsers = [...allUsers];
      newUsers[userIndex].isActive = false;
      setAllUsers(newUsers);
    }
  };

  const enableUser = (userIndex) => async (e) => {
    e.preventDefault();
    const enableUserRes = await enableEmployee(token, allUsers[userIndex].email);
    if (enableUserRes) {
      const newUsers = [...allUsers];
      newUsers[userIndex].isActive = true;
      setAllUsers(newUsers);
    }
  };

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">View All Employees</h1>
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
            {allUsers === null || allUsers.length === 0 ? (
              <tbody>
                <tr>
                  <td className="p-4 bg-white rounded-lg md:p-8 col-span-3 text-gray-500 justify-center">
                    No Employees found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {allUsers.map((user, index) => (
                  <tr
                    className={`bg-white divide-y ${
                      user.isActive ? "text-gray-900" : "text-darkGrey"
                    }`}
                  >
                    <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap bg-gray-100">
                      {user.name}
                      {user.isActive ? null : (
                        <span className="bg-darkGrey text-white rounded-full px-2 py-1 ml-2 text-xs">
                          Disabled
                        </span>
                      )}
                    </th>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">
                      {user.roles.map((role, roleIndex) =>
                        roleButton(role.label, editState[index], removeRole, index, roleIndex),
                      )}
                      {editState[index]
                        ? Object.keys(roleColors).map((role) =>
                            !user.roles.map((role) => role.label).includes(role)
                              ? addRoleButton(role, addRole, index)
                              : null,
                          )
                        : null}
                    </td>
                    <td className="py-4 px-6 flex items-center justify-between">
                      {editState[index] ? (
                        <ConfirmIconButton onConfirmButtonClick={saveEdit(index)} />
                      ) : (
                        <EditIconButton onEditButtonClick={editRole(index)} />
                      )}
                      {user.isActive ? (
                        <button
                          type="button"
                          className="text-darkGrey bg-grey hover:text-black font-bold py-2 px-4 rounded-lg"
                          onClick={disableUser(index)}
                        >
                          Disable
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-darkGrey bg-grey hover:text-black font-bold py-2 px-4 rounded-lg"
                          onClick={enableUser(index)}
                        >
                          Enable
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

const roleColors = {
  admin: "bg-purple-200 text-purple-800",
  gop: "bg-orange-200 text-orange-800",
  borrower: "bg-yellow-200 text-yellow-800",
};

function roleButton(role, editState, removeRole, userIndex, roleIndex) {
  return (
    <div
      className={`${roleColors[role]} rounded-full px-2 py-1 text-xs font-medium inline-block mr-2`}
    >
      <div className="flex items-center">
        <div>{role}</div>
        {editState ? (
          <button type="button" onClick={() => removeRole(userIndex, roleIndex)}>
            <XMarkIcon className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function addRoleButton(role, addRole, userIndex) {
  const inverseRoleColors = {
    admin: "border-purple-800 text-purple-800",
    gop: "border-orange-800 text-orange-800",
    borrower: "border-yellow-800 text-yellow-800",
  };
  return (
    <button
      type="button"
      className={`border-2 ${inverseRoleColors[role]} rounded-full px-2 py-1 text-xs font-medium inline-flex mr-2 items-center`}
      onClick={() => addRole(userIndex, role)}
    >
      <span>{role}</span>
      <PlusIcon className="h-4 w-4" />
    </button>
  );
}

export default Employees;
