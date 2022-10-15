import React from "react";
import Pass from "src/components/borrowPass/pass";

function BorrowPass() {
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">Available Passes</h1>
      <Pass />
    </div>
  )
}

export default BorrowPass;