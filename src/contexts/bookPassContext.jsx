import React, { useState, createContext, useContext, useMemo } from "react";

const defaultBookPassContextState = {
  selectedMembership: "",
  setSelectedMembership: (membership) => {},
  membershipDetails: {},
  setMembershipDetails: (membershipDetails) => {},
};
const BookPassContext = createContext(defaultBookPassContextState);

export function BookPassContextProvider({ children }) {
  const [selectedMembership, setSelectedMembership] = useState("");
  const [membershipDetails, setMembershipDetails] = useState({});

  const bookPassContextState = useMemo(
    () => ({
      selectedMembership,
      setSelectedMembership,
      membershipDetails,
      setMembershipDetails,
    }),
    [selectedMembership, setSelectedMembership, membershipDetails, setMembershipDetails],
  );

  return (
    <BookPassContext.Provider value={bookPassContextState}>{children}</BookPassContext.Provider>
  );
}

// Helper functions
export function useBookPassContext() {
  return useContext(BookPassContext);
}
