import React, { useState, useEffect } from "react";
import { getMembershipReport } from "src/api/dashboard";
import { getAllMemberships } from "src/api/membership";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";

const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType });

  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

function MembershipReport() {
  const token = sessionStorage.getItem("token");
  const [membershipData, setMembershipData] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState(null);

  useEffect(() => {
    renderMemberships();
    async function renderMemberships() {
      const membershipsRes = await getAllMemberships(token);
      setMemberships(membershipsRes.map((membership) => membership.membershipName));
      setSelectedMembership(membershipsRes[0].membershipName);
    }
  }, []);

  useEffect(() => {
    renderMembershipsData();
    async function renderMembershipsData() {
      if (selectedMembership === null) {
        return;
      }
      const employeeDataRes = await getMembershipReport(token, selectedMembership);
      setMembershipData(employeeDataRes);
    }
  }, [selectedMembership]);

  const downloadMembershipReportCSV = async (e) => {
    e.preventDefault();
    const headers = ["month,year,number of loans,number of borrowers"];
    const monthlyCSV = membershipData.reduce((acc, row) => {
      const { month, year, numberOfLoans, numberOfBorrowers } = row;
      acc.push([month, year, numberOfLoans, numberOfBorrowers].join(","));
      return acc;
    }, []);
    downloadFile({
      data: [...headers, ...monthlyCSV].join("\n"),
      fileName: "membership_report.csv",
      fileType: "text/csv",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg md:p-8">
      <div className="flex space-x-4 items-center mb-6">
        <p className="font-medium">Membership: </p>
        <select className="" id="membership" name="membership" value={selectedMembership} onChange={(e) => setSelectedMembership(e.target.value)}>
          {memberships.map((membership) => (
            <option value={membership}>{membership}</option>
          ))}
        </select>
      </div>
      <div className="shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                Month
              </th>
              <th scope="col" className="py-3 px-6">
                Year
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                No. Of Loans
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                No. Of Borrowers
              </th>
            </tr>
          </thead>
          <tbody>
            {membershipData.map((data) => (
              <tr className="bg-white divide-y">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100"
                >
                  {data.month}
                </th>
                <td className="py-4 px-6">{data.year}</td>
                <td className="py-4 px-6 bg-gray-100">{data.numberOfLoans}</td>
                <td className="py-4 px-6 bg-gray-100">{data.numberOfBorrowers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DefaultSecondaryButton buttonName="Export CSV" onButtonClick={downloadMembershipReportCSV} />
    </div>
  );
}

export default MembershipReport;
