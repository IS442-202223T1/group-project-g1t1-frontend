import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useUserContext } from "src/contexts/userContext";
import { getCurrentAccount } from "src/api/account";

export default function NavBar() {
  const history = useHistory();
  const currentRole = sessionStorage.getItem("role");
  const allUserRoles = sessionStorage.getItem("roles");
  const userEmail = sessionStorage.getItem("email");

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded flex justify-center">
      <div className="container flex flex-wrap justify-between items-center max-w-5xl">
        <div className="flex items-center">
          <NavBarLogo currentRole={currentRole} history={history} />
        </div>
        <UserProfile
          currentRole={currentRole}
          allUserRoles={allUserRoles}
          userEmail={userEmail}
          history={history}
        />
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <NavBarItems currentRole={currentRole} history={history} closeMenu={() => {}} />
          </ul>
        </div>
      </div>
    </nav>
  );
}

function NavBarLogo({ currentRole, history }) {
  return (
    <button
      type="button"
      onClick={() => {
        history.push("/");
      }}
    >
      <img src="/logo.png" className="mx-3 h-8 sm:h-9" alt="" />
      {currentRole === "admin" && <span className="text-sm font-bold text-gray-800">Admin</span>}
      {currentRole === "gop" && <span className="text-sm font-bold text-gray-800">GOP</span>}
    </button>
  );
}

function isCurrentPage(href) {
  const currentUrl = document.location.toString().split("/");
  const page = `/${currentUrl[currentUrl.length - 1]}`;

  if (page === href) {
    return true;
  }
  return false;
}

function NavBarItems({ currentRole, history, closeMenu }) {
  const navBarItems = {
    admin: [
      { name: "Memberships", href: "/" },
      { name: "Employees", href: "/employees" },
      { name: "Reports", href: "/reports" },
      { name: "System Config", href: "/view-global-config" },
    ],
    borrower: [
      { name: "Upcoming Bookings", href: "/" },
      { name: "Past Bookings", href: "/past-bookings" },
      { name: "Book a Pass", href: "/book-pass" },
    ],
    gop: [{ name: "Bookings", href: "/" }],
  };

  return navBarItems[currentRole].map((item) => (
    <li>
      <button
        type="button"
        onClick={() => {
          closeMenu();
          history.push(item.href);
        }}
        className={`block py-2 pr-4 pl-3 rounded hover:text-redPri md:p-0 ${
          isCurrentPage(item.href) ? "text-redPri" : "text-gray-700"
        }`}
      >
        {item.name}
      </button>
    </li>
  ));
}

function UserProfile({ currentRole, allUserRoles, userEmail, history }) {
  const { setCurrentSelectedRoleToStateAndSession } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [name, setName] = useState(userEmail.split("@")[0]);

  const showViewBorrowerOption = allUserRoles.includes("borrower") && currentRole !== "borrower";
  const showViewGOPOption = allUserRoles.includes("gop") && currentRole !== "gop";
  const showViewAdminOption = allUserRoles.includes("admin") && currentRole !== "admin";

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    populateName();
    async function populateName() {
      const res = await getCurrentAccount(token);
      if (res.name) {
        setName(res.name);
      }
    }
  }, []);

  const onProfileClick = () => {
    if (isHamburgerOpen) {
      setIsHamburgerOpen(false);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const onHamBurgerClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  const onClickedViewAdminOption = () => {
    setCurrentSelectedRoleToStateAndSession("admin");
    setIsMenuOpen(false);
    history.push("/");
  };

  const onClickedViewGOPOption = () => {
    setCurrentSelectedRoleToStateAndSession("gop");
    setIsMenuOpen(false);
    history.push("/");
  };

  const onClickedViewBorrowerOption = () => {
    setCurrentSelectedRoleToStateAndSession("borrower");
    setIsMenuOpen(false);
    history.push("/");
  };

  const onClickedSignOutOption = () => {
    sessionStorage.clear();
    setIsMenuOpen(false);
    history.push("/login");
  };

  return (
    <div className="flex items-center md:order-2">
      <button
        type="button"
        className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-2 focus:ring-gray-300"
        onClick={onProfileClick}
      >
        <UserCircleIcon className="w-8 h-8 text-darkGrey" />
      </button>

      <div className={`${isMenuOpen ? "" : "hidden"} relative inset-y-5 right-44 z-20`}>
        <div className="absolute w-44 text-base list-none bg-white border border-gray-100 rounded divide-y divide-gray-100">
          <div className="py-3 px-4">
            <span className="block text-sm font-medium text-gray-500 truncate">{name}</span>
          </div>
          <ul className="py-1">
            {showViewAdminOption && (
              <li>
                <button
                  type="button"
                  onClick={onClickedViewAdminOption}
                  className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-redPri"
                >
                  View as Admin
                </button>
              </li>
            )}
            {showViewGOPOption && (
              <li>
                <button
                  type="button"
                  onClick={onClickedViewGOPOption}
                  className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-redPri"
                >
                  View as GOP
                </button>
              </li>
            )}
            {showViewBorrowerOption && (
              <li>
                <button
                  type="button"
                  onClick={onClickedViewBorrowerOption}
                  className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-redPri"
                >
                  View as Staff
                </button>
              </li>
            )}
            <li>
              <button
                type="submit"
                onClick={onClickedSignOutOption}
                className="w-full text-start py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-redPri"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`${isHamburgerOpen ? "md:hidden" : "hidden"} relative inset-y-5 right-32 z-20`}
      >
        <div className="absolute w-44 text-base list-none bg-white border border-gray-100 rounded divide-y divide-gray-100">
          <ul className="py-1">
            <NavBarItems
              currentRole={currentRole}
              history={history}
              closeMenu={() => setIsHamburgerOpen(false)}
            />
          </ul>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={onHamBurgerClick}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
