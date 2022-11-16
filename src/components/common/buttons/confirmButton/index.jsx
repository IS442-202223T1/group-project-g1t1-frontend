import React from "react";

export default function ConfirmButton({buttonName, onButtonClick}) {
  return (
    <button 
      type="submit"
      onClick={onButtonClick}
      className="text-white bg-greenPri hover:bg-greenSec focus:ring-2 focus:ring-grey font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
    >
      {buttonName}
    </button>
  )
}
