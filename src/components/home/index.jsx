import React from "react";
import Pass from "src/components/home/pass";

function Home() {
  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">My Upcoming Passes</h1>
      <Pass />
    </div>
  )
}

export default Home;