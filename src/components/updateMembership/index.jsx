import React from "react";
import MembershipTile from "src/components/updateMembership/membershipTile";
import SearchBar from "src/components/updateMembership/searchBar";
import DefaultSubmitButton from "src/components/common/buttons/defaultSubmitButton";
import { useHistory } from "react-router-dom";
import { mockAdminMembershipData } from "src/utils/mocks";

function UpdateMembership() {
  const history = useHistory();

  const onAddNewButtonClicked = () => {
    history.push("/create-membership");
  }

  const allMemberships = mockAdminMembershipData.map((membership) => (
    <MembershipTile membership={membership} />
  ));

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex justify-around">
        <SearchBar />
        <DefaultSubmitButton buttonName="Add New" onButtonClick={onAddNewButtonClicked} />
      </div>
      <div className="w-10/12 max-w-5xl mt-5 p-5 grid grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
        {allMemberships}
      </div>
    </div>
  )
}

export default UpdateMembership;
