import React from "react";

export default function ButtonTab({index, buttonName, onClick, activeTabIndex}) {
    return (
      <button 
        type="button" 
        onClick={onClick}
        className={`inline-block p-4 ${activeTabIndex === index ? "text-redPri" : "text-gray-600"} hover:bg-gray-100`}
      >
        {buttonName}
      </button>
    );
  }
  