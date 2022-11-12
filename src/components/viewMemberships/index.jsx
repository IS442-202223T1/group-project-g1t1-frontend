import React, { useState, useEffect } from "react";
import MembershipTile from "src/components/viewMemberships/membershipTile";
import DefaultSubmitButton from "src/components/common/buttons/defaultSubmitButton";
import { useHistory } from "react-router-dom";
import { getAllMemberships } from "src/api/borrower";

function ViewMemberships(){
    const history = useHistory();
    const token = sessionStorage.getItem("token");
    const [memberships, setMemberships] = useState([]);
  
    const defaultImageUrl = "https://images.unsplash.com/photo-1464059728276-d877187d61a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=cr";
    const defaultDescription = "No description specified";

    const renderMemberships = memberships.map((membership) => (
        <MembershipTile 
          imageUrl={membership.imageUrl === null ? defaultImageUrl : membership.imageUrl}
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
          <div className="w-10/12 max-w-5xl mt-5 p-5 grid grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
            {memberships.length === 0 ? "No Memberships Found" : renderMemberships}
          </div>
      )
}

export default ViewMemberships;
