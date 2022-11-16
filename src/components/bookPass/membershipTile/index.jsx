import React from "react";
import { useHistory } from "react-router-dom";
import { useBookPassContext } from "src/contexts/bookPassContext";
import { getMembershipDetails } from "src/api/borrower";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";

export default function MembershipTile({imageUrl, name, description}){
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const { setSelectedMembership, setMembershipDetails } = useBookPassContext();

  const onButtonClicked = async () => {
    setSelectedMembership(name);
    const membershipDetails = await getMembershipDetails(token, name);
    setMembershipDetails(membershipDetails);
    history.push("/book-pass-details");
  }

  console.log(imageUrl)

  return (
    <div className="mb-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg">
      <img className="rounded-t-lg object-cover w-screen h-64" src={imageUrl} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate hover:text-clip">{description}</p>
        <div className="mt-auto">
          <DefaultSecondaryButton buttonName="Book a Pass" onButtonClick={onButtonClicked} />
        </div>
      </div>
    </div>
  )
}
