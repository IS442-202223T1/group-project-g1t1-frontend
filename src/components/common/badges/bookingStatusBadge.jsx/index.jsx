import React from "react";

export default function BookingStatusBadge({ status }) {
  const statusToBadgeClass = {
    CONFIRMED: {
      name: "Confirmed",
      color: "bg-blue-200 text-blue-800",
    },
    COLLECTED: {
      name: "Collected",
      color: "bg-purple-200 text-purple-800",
    },
    CANCELLED: {
      name: "Cancelled",
      color: "bg-orange-200 text-orange-800",
    },
    RETURNED: {
      name: "Returned",
      color: "bg-green-100 text-green-800",
    },
    DUESPAID: {
      name: "Dues Paid",
      color: "bg-green-100 text-green-800",
    },
    DUESOWED: {
      name: "Dues Owed",
      color: "bg-red-100 text-red-800",
    },
  };

  return (
    <span
      className={`${statusToBadgeClass[status].color} text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}
    >
      {statusToBadgeClass[status].name}
    </span>
  );
}
