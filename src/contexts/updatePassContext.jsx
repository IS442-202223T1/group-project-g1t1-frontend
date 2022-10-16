import React, { useState, createContext, useContext, useMemo } from "react";

const defaultUpdatePassContextState = {
  selectedPass: {},
  setSelectedPass: (Pass) => {},
};
const UpdatePassContext = createContext(defaultUpdatePassContextState);

export function UpdatePassContextProvider({ children }) {
  const [selectedPass, setSelectedPass] = useState(null);

  const updatePassContextState = useMemo(
    () => ({
      selectedPass,
      setSelectedPass,
    }),
    [
      selectedPass,
      setSelectedPass,
    ],
  );

  return (
    <UpdatePassContext.Provider value={updatePassContextState}>
      {children}
    </UpdatePassContext.Provider>
  );
}

// Helper functions
export function useUpdatePassContext() {
  return useContext(UpdatePassContext);
}

