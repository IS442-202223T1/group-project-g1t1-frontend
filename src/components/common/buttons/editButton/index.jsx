import React from "react";

export default function EditButton({buttonName, onButtonClick}) {
  return (
    <button 
      type="submit"
      onClick={onButtonClick}
      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
    >
      {buttonName}
    </button>
  )
}
