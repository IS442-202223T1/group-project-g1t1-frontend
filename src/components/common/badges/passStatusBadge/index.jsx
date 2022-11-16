import React from "react";

export default function PassStatusBadge({ status }) {
  const statusToBadgeClass = {
    AVAILABLE: "bg-green-100 text-green-800",
    LOST: "bg-red-100 text-red-800",
    LOANED: "bg-blue-200 text-blue-800",
  };

  const badgeStatus = capitalizeFirstLetter(status.toLowerCase());

  return (
    <span
      className={`${statusToBadgeClass[status]} text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}
    >
      {badgeStatus}
    </span>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
