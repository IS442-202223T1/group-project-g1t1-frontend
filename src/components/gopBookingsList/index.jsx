import React from "react";
import Pass from "src/components/gopBookingsList/pass";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";

import { getMonthlyReportCSV } from "src/api/dashboard";


const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType })

  const a = document.createElement("a")
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

function ConfirmedBookings() {
  const token = sessionStorage.getItem("token");
  const downloadMonthlyReportCSV = async (e) => {
    e.preventDefault();
    const res = await getMonthlyReportCSV(token);
    console.log(res);
    const headers = ["month,year,number of loans,number of borrowers"];
    const monthlyCSV = res.reduce((acc, row) => {
      const { month, year, numberOfLoans, numberOfBorrowers } = row
      acc.push([month, year, numberOfLoans, numberOfBorrowers].join(","))
      return acc
    }, [])
    downloadFile({
      data: [...headers,...monthlyCSV].join("\n"),
      fileName: "monthly_report.csv",
      fileType: "text/csv",
    })
  }

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">Confirmed Bookings</h1>
      <Pass />
      <DefaultSecondaryButton buttonName="Export CSV" onButtonClick={downloadMonthlyReportCSV} />
    </div>
  )
}

export default ConfirmedBookings;