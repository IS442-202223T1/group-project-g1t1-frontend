import React from "react";
import { mockUpcomingPassData } from "src/utils/mocks";
import PassTile from "./PassTile";

function Pass() {

  const upcomingPasses = mockUpcomingPassData.map((pass) => (
    <PassTile title={pass.title} imgUrl={pass.imgUrl} date={pass.date} number={pass.numberOfPasses} />
  ));

  return (
    <div className="w-10/12 max-w-5xl mt-5 p-5 mx-auto">
      {upcomingPasses}
    </div>
  )
}

export default Pass;
