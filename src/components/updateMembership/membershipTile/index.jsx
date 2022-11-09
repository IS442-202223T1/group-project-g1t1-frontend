import React from "react";
import { useHistory } from "react-router-dom";
import { useUpdateMembershipContext } from "src/contexts/updateMembershipContext"
import { getMembershipDetails } from "src/api/membership"
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";

export default function MembershipTile({imageUrl, name, description}){
  const history = useHistory();
  const { setSelectedMembership, setMembershipDetails } = useUpdateMembershipContext();

  const onButtonClicked = async () => {
    setSelectedMembership(name);
    const membershipDetails = await getMembershipDetails(name);
    setMembershipDetails(membershipDetails);
    history.push("/update-membership-details");
  }

  return (
    <div className="mb-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg">
      <img className="rounded-t-lg object-cover w-screen h-64" src={imageUrl} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate hover:text-clip">{description}</p>
        <DefaultSecondaryButton buttonName="View more" onButtonClick={onButtonClicked} />
      </div>
    </div>
  )
}
