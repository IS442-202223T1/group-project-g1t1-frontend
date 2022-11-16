import React from "react";
import { useHistory } from "react-router-dom";
import { useBookPassContext } from "src/contexts/bookPassContext";
import BackButton from "src/components/common/buttons/backButton";
import BookPassDetailsForm from "./bookPassDetailsForm";

function BookPassDetails() {
  const history = useHistory();
  const { selectedMembership } = useBookPassContext();

  const onBackButtonClicked = () => {
    history.push("/book-pass");
  }

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex items-center mb-5">
        <BackButton onClick={onBackButtonClicked} />
        <h1 className="font-medium text-3xl">{selectedMembership}</h1>
      </div>
      <BookPassDetailsForm />
    </div>
  )
}

export default BookPassDetails;
