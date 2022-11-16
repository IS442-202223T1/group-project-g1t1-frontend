import React from "react";

export default function DefaultSubmitButton({ buttonName, onButtonClick }) {
  return (
    <button
      type="submit"
      onClick={onButtonClick}
      className="text-white bg-redPri hover:bg-redSec focus:ring-2 focus:ring-grey font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
    >
      {buttonName}
    </button>
  );
}
