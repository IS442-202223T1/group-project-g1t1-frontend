import React from "react";
import { useHistory } from "react-router-dom";
import { useUpdateMembershipContext } from "src/contexts/updateMembershipContext"
import BackButton from "src/components/common/buttons/backButton";
import DefaultSubmitButton from "src/components/common/buttons/defaultSubmitButton";

export default function EditPass() {
  const history = useHistory();
  const { selectedMembership, membershipDetails } = useUpdateMembershipContext();

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
        <h1 className="font-medium text-3xl">{selectedMembership}</h1>
      </div>

      <div className="mt-5 p-5 mx-auto">
        <form>
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Memebership Title</label>
            <input type="text" id="title" value={selectedMembership} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Mandai Wildlife Reserve" required />
          </div>
          <div className="mb-6">
            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Membership Description</label>
            <input type="text" id="desc" value={membershipDetails.description} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Leave a description..." required />
          </div>
          <div className="mb-6">
            <label htmlFor="fee" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pass Lost Fee</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                S$
              </span>
              <input type="number" id="fee" value={membershipDetails.replacementFee} className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
          </div>
          <div className="mb-6">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Corporate Passes</span>
            <PassTableContent passes={membershipDetails.corporatePasses} />
          </div>
          <DefaultSubmitButton buttonName="Update Pass" onButtonClick={onSubmitButtonClicked} />
        </form>
      </div>
    </div>
  )
}

function PassTableContent({passes}) {

  return (
    <div className="bg-white rounded-lg">
      <div className="shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                Pass ID
              </th>
              <th scope="col" className="py-3 px-6">
                Pass Admits
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {
              passes.map((pass) => 
                <tr className="bg-white divide-y">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                    {pass.passID}
                  </th>
                  <td className="py-4 px-6">
                    {pass.maxPersonsAdmitted}
                  </td>
                  <td className="py-4 px-6 bg-gray-100">
                    <PassStatusBadge status={pass.status} />
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PassStatusBadge({status}) {
  const statusToBadgeClass = {
    "AVAILABLE": "bg-green-100 text-green-800",
    "LOST": "bg-red-100 text-red-800", 
    "LOANED": "bg-blue-200 text-blue-800",
  };

  const badgeStatus = capitalizeFirstLetter(status.toLowerCase());

  return (
    <span className={`${statusToBadgeClass[status]} text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}>{badgeStatus}</span>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
