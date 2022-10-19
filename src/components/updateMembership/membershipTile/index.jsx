import React from "react";
import { useHistory } from "react-router-dom";
import { useUpdateMembershipContext } from "src/contexts/updateMembershipContext"
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";

export default function MembershipTile({membership}){
  const history = useHistory();
  const { setSelectedMembership } = useUpdateMembershipContext();

  const onButtonClicked = () => {
    setSelectedMembership(membership);
    history.push("/update-membership-details");
  }

  return (
    <div className="mb-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg object-cover w-screen h-64" src={membership.imgUrl} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{membership.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate hover:text-clip">{membership.desc}</p>
        <DefaultSecondaryButton buttonName="View more" onButtonClick={onButtonClicked} />
      </div>
    </div>
  )
}
