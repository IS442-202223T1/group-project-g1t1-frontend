import React from "react";
import { useHistory } from "react-router-dom";
import { useUpdatePassContext } from "src/contexts/updatePassContext";
import BackButton from "src/components/common/buttons/backButton";
import UpdatePassDetailsBody from "./updatePassDetailsBody";

function UpdatePassDetails() {
  const history = useHistory();
  const { selectedPass } = useUpdatePassContext();

  const onBackButtonClicked = () => {
    history.push("/");
  }

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex items-center mb-5">
        <BackButton onClick={onBackButtonClicked} />
        <h1 className="font-medium text-3xl">{selectedPass.title}</h1>
      </div>
      <UpdatePassDetailsBody />
    </div>
  )
}

export default UpdatePassDetails;
