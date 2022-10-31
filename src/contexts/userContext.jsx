import React, { useState, createContext, useContext, useMemo } from "react";

// Do not remove default unused vars as typescript uses this for type hinting
const defaultUserContextState = {
  isUserLoggedIn: false,
  setIsUserLoggedIn: (loggedInStatus) => {},
  currentUserRoles: "",
  setUserRolesToStateAndSession: (roles) => {},
  currentSelectedRole: "",
  setCurrentSelectedRoleToStateAndSession: (role) => {},
  currentUserEmail: null,
  setCurrentUserEmailToStateAndSession: (email) => {},
};
const UserContext = createContext(defaultUserContextState);

export function UserProvider({ children }) {
  const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
  const [currentUserRoles, setCurrentUserRoles] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentSelectedRole, setCurrentSelectedRole] = useState("");

  const setUserRolesToStateAndSession = (roles) => {
    setCurrentUserRoles(roles);
    sessionStorage.setItem("roles", roles);
  };

  const setCurrentSelectedRoleToStateAndSession = (role) => {
    setCurrentSelectedRole(role);
    sessionStorage.setItem("role", role);
  };

  const setCurrentUserEmailToStateAndSession = (email) => {
    setCurrentUserEmail(email);
    sessionStorage.setItem("email", email);
  };

  const UserContextState = useMemo(
    () => ({
      isUserLoggedin,
      setIsUserLoggedIn,
      currentUserRoles,
      setUserRolesToStateAndSession,
      currentSelectedRole,
      setCurrentSelectedRoleToStateAndSession,
      currentUserEmail,
      setCurrentUserEmailToStateAndSession,
    }),
    [
      isUserLoggedin,
      setIsUserLoggedIn,
      currentUserRoles,
      setUserRolesToStateAndSession,
      currentSelectedRole,
      setCurrentSelectedRoleToStateAndSession,
      currentUserEmail,
      setCurrentUserEmailToStateAndSession,
    ],
  );

  return <UserContext.Provider value={UserContextState}>{children}</UserContext.Provider>;
}

// Helper functions
export function useUserContext() {
  return useContext(UserContext);
}
