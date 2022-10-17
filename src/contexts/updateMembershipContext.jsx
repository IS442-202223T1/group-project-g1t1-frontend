import React, { useState, createContext, useContext, useMemo } from "react";

const defaultUpdateMembershipContextState = {
  selectedMembership: {},
  setSelectedMembership: (membership) => {},
};
const UpdateMembershipContext = createContext(defaultUpdateMembershipContextState);

export function UpdateMembershipContextProvider({ children }) {
  const [selectedMembership, setSelectedMembership] = useState(null);

  const updateMembershipContextState = useMemo(
    () => ({
      selectedMembership,
      setSelectedMembership,
    }),
    [
      selectedMembership,
      setSelectedMembership,
    ],
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

