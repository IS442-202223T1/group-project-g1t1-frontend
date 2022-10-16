import React from "react";
import Pass from "src/components/updatePass/pass";
import SearchBar from "src/components/updatePass/searchBar";
import SubmitButton from "src/components/common/buttons/yellowSubmitButton";

function UpdatePass() {
  const onAddNewButtonClicked = () => {
    console.log("Add new button clicked");
  }

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex justify-around">
        <SearchBar />
        <SubmitButton buttonName="Add New" onButtonClick={onAddNewButtonClicked} />
      </div>
      <Pass />
    </div>
  )
}

export default UpdatePass;
