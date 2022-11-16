import React from "react";

export default function BackButton({onClick}) {
  return (
    <button
      onClick={onClick}
      type="submit"
    >
      <svg className="w-6 h-6 mr-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
    </button>
  )
}
