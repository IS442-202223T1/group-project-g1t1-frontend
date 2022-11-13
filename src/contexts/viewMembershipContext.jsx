import React, { useState, createContext, useContext, useMemo } from "react";

const defaultViewMembershipContextState = {
  selectedMembership: "",
  setSelectedMembership: (membership) => {},
};
const ViewMembershipContext = createContext(defaultViewMembershipContextState);

export function ViewMembershipContextProvider({ children }) {
  const [selectedMembership, setSelectedMembership] = useState("");
  const [membershipDetails, setMembershipDetails] = useState({});

  const viewMembershipContextState = useMemo(
    () => ({
      selectedMembership,
      setSelectedMembership,
      membershipDetails,
      setMembershipDetails,
    }),
    [
      selectedMembership,
      setSelectedMembership,
      membershipDetails,
      setMembershipDetails,
    ],
  );

  return (
    <ViewMembershipContext.Provider value={viewMembershipContextState}>
      {children}
    </ViewMembershipContext.Provider>
  );
}

// Helper functions
export function useViewMembershipContext() {
  return useContext(ViewMembershipContext);
}