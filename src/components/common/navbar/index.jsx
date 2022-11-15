import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserContext } from "src/contexts/userContext";

export default function NavBar() {
  const currentRole = sessionStorage.getItem("role");
  const allUserRoles = sessionStorage.getItem("roles");
  const userEmail = sessionStorage.getItem("email");

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap justify-around items-center">
        <div className="flex items-center">
          <NavBarLogo currentRole={currentRole} />
        </div>
        <UserProfile currentRole={currentRole} allUserRoles={allUserRoles} userEmail={userEmail} />
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
          <NavBarItems currentRole={currentRole} />
        </div>
      </div>
    </nav>
  )
}

function NavBarLogo({currentRole}) {
  return (
    <>
      <img src="/logo.png" className="mx-3 h-8 sm:h-9" alt="" />
      {currentRole === "admin" && <span className="text-sm font-bold text-gray-800">Admin</span>}
    </>
  )
}

function isCurrentPage(href) {
  const currentUrl = document.location.toString().split("/");
  const page = `/${currentUrl[currentUrl.length - 1]}`;

  if (page === href) {
    return true;
  }
  return false;
}

function NavBarItems({currentRole}) {
  const history = useHistory();

  const navBarItems = {
    "admin": [
      {name: "Memberships", href: "/"},
      {name: "Employees", href: "/employees"},
      {name: "Reports", href: "/reports"},
    ],
    "borrower": [
      {name: "Upcoming Bookings", href: "/"},

      {name: "Borrow Pass", href: "/borrow-pass"},
      {name: "Past Bookings", href: "/past-bookings"},

      {name: "All Attractions", href : "/view-memberships"},
      {name: "Confirmed bookings", href : "/gop-bookings-list"}

    ]
  }

  const renderNavBarItems = navBarItems[currentRole].map((item) => (
    <li>
      <button
        type="button"
        onClick = {() => {
          history.push(item.href);
        }} 
        className={`block py-2 pr-4 pl-3 rounded hover:text-redPri md:p-0 ${isCurrentPage(item.href) ? "text-redPri" : "text-gray-700"}`} 
      >
        {item.name}
      </button>
    </li>
  ));

  return (
    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
      {renderNavBarItems}
    </ul>
  );
}

function UserProfile({currentRole, allUserRoles, userEmail}) {
  const { setCurrentSelectedRoleToStateAndSession } = useUserContext();
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showViewBorrowerOption = allUserRoles.includes("borrower") && currentRole === "admin";
  const showViewAdminOption = allUserRoles.includes("admin") && currentRole === "borrower";

  const onProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const onClickedViewAdminOption = (e) => {
    setCurrentSelectedRoleToStateAndSession("admin");
    setIsMenuOpen(false);
    history.push("/");
  }

  const onClickedViewBorrowerOption = (e) => {
    setCurrentSelectedRoleToStateAndSession("borrower");
    setIsMenuOpen(false);
    history.push("/");
  }

  const onClickedSignOutOption = (e) => {
    sessionStorage.clear();
    setIsMenuOpen(false);
    history.push("/login");
  }

  return (
    <div className="flex items-center md:order-2">
      <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-2 focus:ring-gray-300" onClick={onProfileClick}>
        <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3580&q=80" alt="user"/>
      </button>

      <div className={`${isMenuOpen ? "" : "hidden"} relative inset-y-5 right-10 z-20`}>
        <div className="absolute w-44 text-base list-none bg-white border border-gray-100 rounded divide-y divide-gray-100">
          <div className="py-3 px-4">
            <span className="block text-sm text-gray-900">Bonnie Green</span>
            <span className="block text-sm font-medium text-gray-500 truncate">{userEmail}</span>
          </div>
          <ul className="py-1">
            {showViewAdminOption && <li><button type="button" onClick={onClickedViewAdminOption} className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-redPri">View as Admin</button></li>}
            {showViewBorrowerOption && <li><button type="button" onClick={onClickedViewBorrowerOption} className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-redPri">View as Staff</button></li>}
            <li><button type="submit" onClick={onClickedSignOutOption} className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-redPri">Sign Out</button></li>
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
