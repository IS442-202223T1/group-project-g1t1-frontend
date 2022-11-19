import React, { useState, useEffect, useMemo } from "react";
import MembershipTile from "src/components/bookPass/membershipTile";
import { useHistory } from "react-router-dom";
import { getAllMemberships } from "src/api/borrower";
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enGB from "date-fns/locale/en-GB"
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomWeekView from "./calendar/customView";

function BookPass() {
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const [memberships, setMemberships] = useState([]);
  const [passAvailability, setPassAvailability] = useState([]);
  const [view, setView] = useState("list");
  const currDate = new Date();
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: currDate,
      views: {
        month: true,
        week: true,
      },
    }),
    []
  )

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

    const start = new Date();
    start.setHours(0,0,0,0);
    
    const end = new Date();
    end.setHours(23,59,59,999);
    setPassAvailability([
      {
        title: "My Event",
        start,
        end,
      }
    ])

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
  }

  const renderListView = () => (memberships.length === 0 ? (
    <div className="flex justify-center text-center col-span-full">
      <span className="text-lg font-medium">No Memberships Found</span>
    </div>
  ) : (
    renderMemberships
  ))

  const locales = {
    "en-GB": enGB,
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  const renderCalendarView = () => {
    const currDate = new Date();
    currDate.setDate(currDate.getDate() + 1);
    return (
      <div className="flex justify-center items-center text-center h-[75vh] w-full col-span-full">
        <Calendar
          localizer={localizer}
          events={passAvailability}
          startAccessor="start"
          endAccessor="end"
          className=""
          views={views}
          min={currDate}
        />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex justify-between items-center">
        <span className="font-medium text-3xl">Book a Pass</span>
        <button type="button" className="text-redPri hover:text-redSec" onClick={toggleView}>
          Toggle View ({(view === "list") ? "Calendar" : "List"})
        </button>
      </div>
      <div className="w-10/12 max-w-5xl mt-5 p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
        {
          (view === "list") ?
          renderListView()
          :
          renderCalendarView()
        }
      </div>
    </div>
  );
}

export default BookPass;
