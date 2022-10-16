import React from "react";

export default function PassStatusBadge({status}) {
  const statusToBadgeClass = {
    "Available": "bg-green-100 text-green-800",
    "Lost": "bg-red-100 text-red-800", 
    "Loaned": "bg-blue-200 text-blue-800",
  };

  return (
    <span className={`${statusToBadgeClass[status]} text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}>{status}</span>
  );
}
