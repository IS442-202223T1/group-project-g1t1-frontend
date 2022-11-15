import React, { useState, useEffect } from "react";
import MembershipTile from "src/components/updateMembership/membershipTile";
import DefaultSubmitButton from "src/components/common/buttons/defaultSubmitButton";
import { useHistory } from "react-router-dom";
import { getAllMemberships } from "src/api/membership";

function UpdateMembership() {
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const [memberships, setMemberships] = useState([]);

  const defaultImageUrl = "https://images.unsplash.com/photo-1464059728276-d877187d61a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=cr";
  const defaultDescription = "No description specified";

  const onAddNewButtonClicked = () => {
    history.push("/create-membership");
  }

  const renderMemberships = memberships.map((membership) => (
    <MembershipTile 
      imageUrl={(membership.imageUrl === null || membership.imageUrl === "") ? defaultImageUrl : membership.imageUrl}
      name={membership.membershipName}
      description={membership.description === "" ? defaultDescription : membership.description}
    />
  ));

  useEffect(() => {
    renderMemberships();

    async function renderMemberships() {
      const allMemberships = await getAllMemberships(token);

      setMemberships(allMemberships);
    }
  }, []);

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex justify-between items-center">
        <span className="font-medium text-3xl">View All Memberships</span>
        <DefaultSubmitButton buttonName="Add Membership" onButtonClick={onAddNewButtonClicked} />
      </div>
      <div className="w-10/12 max-w-5xl mt-5 p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
      {
        memberships.length === 0 
        ? <div className="flex justify-center text-center col-span-full">
            <span className="text-lg font-medium">No Memberships Found</span> 
          </div>
        : renderMemberships
      }
      </div>
    </div>
  )
}

export default UpdateMembership;
