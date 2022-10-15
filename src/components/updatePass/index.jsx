import React from "react";
import Pass from "src/components/updatePass/pass";
import SearchBar from "src/components/updatePass/searchBar";

function UpdatePass() {
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex justify-around">
        <SearchBar />
        <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Add New</button>
      </div>
      <Pass />
    </div>
  )
}

export default UpdatePass;