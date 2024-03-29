import React, { useState, createContext, useContext, useMemo } from "react";

const defaultUpdateMembershipContextState = {
  selectedMembership: "",
  setSelectedMembership: (membership) => {},
};
const UpdateMembershipContext = createContext(defaultUpdateMembershipContextState);

export function UpdateMembershipContextProvider({ children }) {
  const [selectedMembership, setSelectedMembership] = useState("");
  const [membershipDetails, setMembershipDetails] = useState({});

  const updateMembershipContextState = useMemo(
    () => ({
      selectedMembership,
      setSelectedMembership,
      membershipDetails,
      setMembershipDetails,
    }),
    [selectedMembership, setSelectedMembership, membershipDetails, setMembershipDetails],
  );

  return (
    <UpdateMembershipContext.Provider value={updateMembershipContextState}>
      {children}
    </UpdateMembershipContext.Provider>
  );
}

// Helper functions
export function useUpdateMembershipContext() {
  return useContext(UpdateMembershipContext);
}
