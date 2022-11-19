import React, { useState, useEffect } from "react";
import { getAllMemberships, getAvailableBookings } from "src/api/borrower";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isBefore,
  isAfter,
  startOfDay,
  isSameMonth,
  isToday,
  parse,
} from "date-fns";

export default function CalendarView() {
  const [availablePasses, setAvailablePasses] = useState([]);
  const today = startOfDay(new Date());
  const token = sessionStorage.getItem("token");
  const [viewStartDate, setViewStartDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(add(today, { days: 1 }));
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, "MMM-yyyy"));
    setViewStartDate(firstDayPrevMonth);
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setViewStartDate(firstDayNextMonth);
  }

  useEffect(() => {
    renderAvailableBookings();

    async function renderAvailableBookings() {
      const availableBookingsRes = await getAvailableBookings(
        token,
        viewStartDate,
        endOfMonth(viewStartDate),
      );
      setAvailablePasses(availableBookingsRes);
    }
  }, [viewStartDate]);

  const currDate = new Date();
  currDate.setDate(currDate.getDate() + 1);

  return (
    <div className="flex-1 justify-center items-center text-center h-[75vh] col-span-full">
      <div className="md:grid md:grid-cols-2 md:divide-x divide-y md:divide-y-0 md:divide-gray-200">
        <div className="md:pr-14">
          <div className="flex items-center">
            <h2 className="flex-auto font-semibold text-gray-900">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="grid grid-cols-7 mt-2 text-sm">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(dayIdx === 0 && colStartClasses[getDay(day)], "py-1.5")}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isAfter(day, today)) {
                      setSelectedDay(day);
                    }
                  }}
                  className={classNames(
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) && isToday(day) && "text-red-500",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                    isEqual(day, selectedDay) && "bg-redPri",
                    isBefore(day, today) && "cursor-not-allowed text-darkGrey disabled",
                    isAfter(day, today) && "hover:bg-grey hover:text-black",
                    (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
                </button>

                <div className="flex w-6 mx-auto mt-1">
                  {isAfter(day, today) &&
                    availablePasses[format(day, "yyyy-MM-dd")] !== undefined &&
                    availablePasses[format(day, "yyyy-MM-dd")]
                      .slice(0, 3)
                      .map((pass) => (
                        <div
                          key={pass.id}
                          className="w-1 h-1 mx-auto mt-1 rounded-full bg-redSec"
                        />
                      ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-12 md:pt-0 md:pl-14">
          <h2 className="font-semibold text-gray-900">
            Available Passes for{" "}
            {selectedDay.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              weekday: "short",
            })}
          </h2>
          <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
            {availablePasses[format(selectedDay, "yyyy-MM-dd")] !== undefined &&
            availablePasses[format(selectedDay, "yyyy-MM-dd")].length > 0 ? (
              availablePasses[format(selectedDay, "yyyy-MM-dd")].map((pass) => (
                <AvailablePassTile pass={pass} key={pass.id} />
              ))
            ) : (
              <p>No available passes for today.</p>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

function AvailablePassTile({ pass }) {

  return (
    <li className="flex items-center justify-between px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <img src={pass.membership.imageUrl} alt="" className="flex-none w-10 h-10 rounded-full" />
      <div className="text-left">
        <p className="text-black font-semibold text-md">{pass.membership.membershipName}</p>
        <p className="text-darkGray">{pass.passID}</p>
      </div>
      <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
    </li>
  );
}
