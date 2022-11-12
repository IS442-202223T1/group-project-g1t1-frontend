import React from "react";
import { useHistory } from "react-router-dom";
import { useViewMembershipContext } from "src/contexts/viewMembershipContext";
import BackButton from "src/components/common/buttons/backButton";
import ViewMembershipDetailsBody from "./viewMembershipDetailsBody";

function ViewMembershipDetails() {
  const history = useHistory();
  const { selectedMembership } = useViewMembershipContext();

  const onBackButtonClicked = () => {
    history.push("/");
  }

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex items-center mb-5">
        <BackButton onClick={onBackButtonClicked} />
        <h1 className="font-medium text-3xl">{selectedMembership}</h1>
      </div>
      <ViewMembershipDetailsBody />
    </div>
  )
}

export default ViewMembershipDetails;