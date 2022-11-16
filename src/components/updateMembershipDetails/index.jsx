import React from "react";
import { useHistory } from "react-router-dom";
import { useUpdateMembershipContext } from "src/contexts/updateMembershipContext";
import BackButton from "src/components/common/buttons/backButton";
import UpdateMembershipDetailsBody from "./updateMembershipDetailsBody";

function UpdateMembershipDetails() {
  const history = useHistory();
  const { selectedMembership, membershipDetails } = useUpdateMembershipContext();

  const onBackButtonClicked = () => {
    history.push("/");
  }

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex items-center mb-5">
        <BackButton onClick={onBackButtonClicked} />
        <h1 className="font-medium text-3xl">{selectedMembership}</h1>
        {membershipDetails.active ? null : <div className="ml-3 bg-darkGrey text-white px-2 py-1 rounded-full">Inactive</div>}
      </div>
      <UpdateMembershipDetailsBody />
    </div>
  )
}

export default UpdateMembershipDetails;
