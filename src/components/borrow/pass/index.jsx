import React from "react";
import { mockAvailablePassData } from "src/utils/mocks";
import PassTile from "./PassTile";

function Pass() {

  const availablePasses = mockAvailablePassData.map((pass) => (
    <PassTile title={pass.title} imgUrl={pass.imgUrl} desc={pass.desc} />
  ));

  return (
    <div className="w-10/12 max-w-5xl mt-5 p-5 mx-auto">
      {availablePasses}
    </div>
  )
}

export default Pass;
