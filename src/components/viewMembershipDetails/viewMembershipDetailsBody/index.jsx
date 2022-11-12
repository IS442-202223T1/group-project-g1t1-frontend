import React from "react";
import { useViewMembershipContext } from "src/contexts/viewMembershipContext";

export default function ViewMembershipDetailsBody() {
  const {membershipDetails } = useViewMembershipContext();


  return (
    <div className="w-full bg-white rounded-lg border shadow-md">
        <PassContent desc={membershipDetails.description} fee={membershipDetails.replacementFee}/>
    </div>
  )
}

function PassContent({desc, fee}) {
  const defaultDescription = "No description specified";

  return (
    <div className="p-4 bg-white rounded-lg md:p-8" >
      <ul className="divide-y divide-gray-300">
      <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4 justify-start">
            <div className="flex-none w-44">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Description
              </p>
            </div>
            <div className="flex-1 items-center text-base font-semibold text-gray-900 dark:text-white">
              {desc === "" ? defaultDescription : desc}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
