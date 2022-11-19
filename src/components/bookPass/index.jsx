import React, { useState, useEffect } from "react";
import MembershipTile from "src/components/bookPass/membershipTile";
import { getAllMemberships } from "src/api/borrower";
import CalendarView from "src/components/bookPass/calendarView";

function BookPass() {
  const token = sessionStorage.getItem("token");
  const [memberships, setMemberships] = useState([]);
  const [view, setView] = useState("calendar");


  const defaultImageUrl =
    "https://images.unsplash.com/photo-1464059728276-d877187d61a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=cr";
  const defaultDescription = "No description specified";

  const renderMemberships = memberships.map((membership) => (
    <MembershipTile
      imageUrl={
        membership.imageUrl === null || membership.imageUrl === ""
          ? defaultImageUrl
          : membership.imageUrl
      }
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

  const toggleView = () => {
    if (view === "list") {
      setView("calendar");
    } else {
      setView("list");
    }
  };

  const renderListView = () =>
  memberships.length === 0 ? (
    <div className="flex justify-center text-center col-span-full">
      <span className="text-lg font-medium">No Memberships Found</span>
    </div>
  ) : (
    renderMemberships
  );

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex justify-between items-center">
        <span className="font-medium text-3xl">Book a Pass</span>
        <button type="button" className="text-redPri hover:text-redSec" onClick={toggleView}>
          Toggle View ({view === "list" ? "Calendar" : "List"})
        </button>
      </div>
      <div className="w-10/12 max-w-5xl mt-5 p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
        {view === "list" ? renderListView() : <CalendarView />}
      </div>
    </div>
  );
}

export default BookPass;
