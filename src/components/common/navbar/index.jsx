import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserContext } from "src/contexts/userContext";

export default function NavBar() {
  const { currentUserRoles, currentSelectedRole, setCurrentSelectedRoleToStateAndSession, currentUserEmail } = useUserContext();

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap justify-around items-center">
        <div className="flex items-center">
          <NavBarLogo isAdmin={currentSelectedRole === "admin"} />
        </div>
        <UserProfile userEmail={currentUserEmail} allRoles={currentUserRoles} currentRole={currentSelectedRole} setCurrentRole={setCurrentSelectedRoleToStateAndSession} />
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
          <NavBarItems isAdmin={currentSelectedRole === "admin"} />
        </div>
      </div>
    </nav>
  )
}

function NavBarLogo({isAdmin}) {
  return (
    <>
      <img src="/logo.png" className="mx-3 h-8 sm:h-9" alt="" />
      {isAdmin && <span className="text-sm font-bold text-gray-800">Admin</span>}
    </>
  )
}

function NavBarItems({isAdmin}) {
  if (isAdmin) {
    return (
      <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
        <li>
          <a href="/" className="block py-2 pr-4 pl-3 text-white bg-redPri rounded md:bg-transparent md:text-redPri md:p-0">Memberships</a>
        </li>
        <li>
          <a href="/employees" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-redPri md:p-0">Employee</a>
        </li>
        <li>
          <a href="/reports" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-redPri md:p-0">Reports</a>
        </li>
      </ul>
    )
  }

  return (
    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
      <li>
        <a href="/" className="block py-2 pr-4 pl-3 text-white bg-redPri rounded md:bg-transparent md:text-redPri md:p-0">My Pass</a>
      </li>
      <li>
        <a href="/borrow-pass" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-redPri md:p-0">Borrow Pass</a>
      </li>
    </ul>
  )
}

function UserProfile({userEmail, allRoles, currentRole, setCurrentRole}) {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showViewBorrowerOption = allRoles.includes("borrower") && currentRole === "admin";
  const showViewAdminOption = allRoles.includes("admin") && currentRole === "borrower";

  const onProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const onClickedViewAdminOption = (e) => {
    e.preventDefault();
    setCurrentRole("admin");
    history.push("/");
  }

  const onClickedViewBorrowerOption = (e) => {
    e.preventDefault();
    setCurrentRole("borrower");
    history.push("/");
  }

  return (
    <div className="flex items-center md:order-2">
      <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-2 focus:ring-gray-300" onClick={onProfileClick}>
        <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3580&q=80" alt="user"/>
      </button>

      <div className={`${isMenuOpen ? "" : "hidden"} relative inset-y-5 right-10`}>
        <div className="absolute w-44 text-base list-none bg-white border border-gray-100 rounded divide-y divide-gray-100">
          <div className="py-3 px-4">
            <span className="block text-sm text-gray-900">Bonnie Green</span>
            <span className="block text-sm font-medium text-gray-500 truncate">{userEmail}</span>
          </div>
          <ul className="py-1">
            {showViewAdminOption && <li><button type="submit" onClick={onClickedViewAdminOption} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">View as Admin</button></li>}
            {showViewBorrowerOption && <li><button type="submit" onClick={onClickedViewBorrowerOption} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">View as Staff</button></li>}
            <li>
              <a href="/login" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
            </li>
          </ul>
        </div>
      </div>

      <button type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/></svg>
      </button>
    </div>
  )
}
