import React from "react";
import { useHistory } from "react-router-dom";
import { useUpdateMembershipContext } from "src/contexts/updateMembershipContext"
import BackButton from "src/components/common/buttons/backButton";
import YellowSubmitButton from "src/components/common/buttons/yellowSubmitButton";

export default function EditPass() {
  const history = useHistory();
  const { selectedMembership } = useUpdateMembershipContext();

  const onBackButtonClicked = () => {
    history.push("/update-membership-details");
  }

  const onSubmitButtonClicked = () => {
    history.push("/update-membership-details");
  }

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex items-center mb-5">
        <BackButton onClick={onBackButtonClicked} />
        <h1 className="font-medium text-3xl">{selectedMembership.title}</h1>
      </div>

      <div className="mt-5 p-5 mx-auto">
        <form>
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Memebership Title</label>
            <input type="text" id="title" value={selectedMembership.title} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Mandai Wildlife Reserve" required />
          </div>
          <div className="mb-6">
            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Membership Description</label>
            <input type="text" id="desc" value={selectedMembership.desc} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Leave a description..." required />
          </div>
          <div className="mb-6">
            <label htmlFor="fee" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pass Lost Fee</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                S$
              </span>
              <input type="number" id="fee" value={selectedMembership.fee} className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="pax" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Number of Pax per Pass</label>
            <input type="number" id="pax" value={selectedMembership.pax} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <YellowSubmitButton buttonName="Update Pass" onButtonClick={onSubmitButtonClicked} />
        </form>
      </div>
    </div>
  )
}