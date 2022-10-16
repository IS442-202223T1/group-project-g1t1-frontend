import React from "react";
import PassTile from "src/components/updatePass/passTile";
import SearchBar from "src/components/updatePass/searchBar";
import SubmitButton from "src/components/common/buttons/yellowSubmitButton";
import { useHistory } from "react-router-dom";
import { mockAdminPassData } from "src/utils/mocks";

function UpdatePass() {
  const history = useHistory();

  const onAddNewButtonClicked = () => {
    history.push("/create-pass");
  }

  const allPasses = mockAdminPassData.map((pass) => (
    <PassTile pass={pass} />
  ));

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex justify-around">
        <SearchBar />
        <SubmitButton buttonName="Add New" onButtonClick={onAddNewButtonClicked} />
      </div>
      <div className="w-10/12 max-w-5xl mt-5 p-5 grid grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
        {allPasses}
      </div>
    </div>
  )
}

export default UpdatePass;
