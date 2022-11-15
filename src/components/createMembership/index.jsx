import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { createNewMembership } from "src/api/membership";
import BackButton from "src/components/common/buttons/backButton";
import { DefaultEmailTemplate } from "./defaultEmailTemplate";
import DefaultSubmitButton from "../common/buttons/defaultSubmitButton";

export default function CreateMembership() {
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [emailTemplate, setEmailTemplate] = useState(DefaultEmailTemplate);
  const [emailPreview, setEmailPreview] = useState(false);
  const [fee, setFee] = useState(0);
  const [passType, setPassType] = useState("physical");

  const [passes, setPasses] = useState([]);

  const valueSetters = {
    name: setName,
    desc: setDescription,
    img: setImageUrl,
    emailTemplate: setEmailTemplate,
    fee: setFee,
    electronic: setPassType,
    physical: setPassType,
    address: setAddress,
  }

  const handleValueChange = (e) => {
    e.preventDefault();
    valueSetters[e.target.id](e.target.value);
  }

  const toggleEmailPreview = () => {
    setEmailPreview(!emailPreview);
  }

  const onBackButtonClicked = () => {
    history.push("/");
  }

  const onSubmitButtonClicked = async (e) => {
    e.preventDefault();
    const newEmail = {};
    newEmail.templateContent = emailTemplate;
    const res = await createNewMembership(token, name, address, description, imageUrl, newEmail, fee, passType, passes);
    if (res) {
      history.push("/")
    }
  }

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex items-center mb-5">
        <BackButton onClick={onBackButtonClicked} />
        <h1 className="font-medium text-3xl">Add a New Membership</h1>
      </div>
      <div className="mt-5 p-5">
        <form>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Membership Name</label>
            <input type="text" id="name" onChange={handleValueChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Mandai Wildlife Reserve" required />
          </div>
          <div className="mb-6">
            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900">Membership Address</label>
            <input type="text" id="address" onChange={handleValueChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add an address..." required />
          </div>
          <div className="mb-6">
            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900">Membership Description</label>
            <input type="text" id="desc" onChange={handleValueChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Leave a description..." required />
          </div>
          <div className="mb-6">
            <label htmlFor="img" className="block mb-2 text-sm font-medium text-gray-900">Image URL</label>
            <input type="text" id="img" onChange={handleValueChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add an image URL..." />
          </div>
          <div className="mb-6">
            <label htmlFor="fee" className="block mb-2 text-sm font-medium text-gray-900">Pass Lost Fee</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
                S$
              </span>
              <input type="number" id="fee" onChange={handleValueChange} className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"/>
            </div>
          </div>
          <div className="flex mb-6 justify-around">
            <div className="flex items-center p-2 w-full max-w-sm rounded border border-gray-200 hover:border-redPri">
                <input id="electronic" type="radio" onChange={handleValueChange} value="electronic" name="bordered-radio" className="w-4 h-4 text-redPri bg-gray-100 border-gray-300" />
                <label htmlFor="electronic" className="py-4 ml-2 w-full text-sm font-medium text-gray-900">Electronic Pass</label>
            </div>
            <div className="flex items-center p-2 w-full max-w-sm rounded border border-gray-200 hover:border-redPri">
                <input checked id="physical" type="radio" onChange={handleValueChange} value="physical" name="bordered-radio" className="w-4 h-4 text-redPri bg-gray-100 border-gray-300" />
                <label htmlFor="physical" className="py-4 ml-2 w-full text-sm font-medium text-gray-900">Physical Pass</label>
            </div>
          </div>
          <div className="mb-6">
            <span className="block mb-2 text-sm font-medium text-gray-900">Corporate Passes</span>
            <PassTableForm passes={passes} setPasses={setPasses} />
          </div>
          <div className="mb-6">
            <label htmlFor="emailTemplate" className="block mb-2 text-sm font-medium text-gray-900">Entry to Attraction Email Template</label>
            {
              emailPreview ? 
              <div dangerouslySetInnerHTML={{ __html: emailTemplate}} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
              : 
              <textarea rows={10} id="emailTemplate" onChange={handleValueChange} value={emailTemplate} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Leave a description..." required />
            }
            <div className="flex justify-end my-2">
              <button type="button" onClick={toggleEmailPreview} className="text-sm font-medium  text-redPri rounded-lg py-1 px-2 hover:text-redPriDark hover:bg-gray-200">{emailPreview ? "Edit" : "Preview"}</button>
            </div>
          </div>
          <DefaultSubmitButton buttonName="Create Membership" onButtonClick={onSubmitButtonClicked} />
        </form>
      </div>
    </div>
  )
}

function PassTableForm({passes, setPasses}) {
  const [allPasses, setAllPasses] = useState(passes);
  const allStatus = Array(allPasses === null ? 0 : allPasses.length ).fill(false);
  const [passesEditingToggle, setPassesEditingToggle] = useState(allStatus);

  const createPassesEditingToggle = useCallback(() => {
      const updatedPassesEditingToggle = JSON.parse(JSON.stringify(passesEditingToggle));
      while (updatedPassesEditingToggle.length < allPasses.length) {
        updatedPassesEditingToggle.push(true);
        setPassesEditingToggle(updatedPassesEditingToggle);
      }
  }, [allPasses, passesEditingToggle])

  useEffect(() => {
    createPassesEditingToggle();
  }, [createPassesEditingToggle])

  useEffect(() => {
    setPasses(allPasses);
  }, [allPasses])

  const handleEditButtonClick = (index) => {
    const updatedEditPassStatus = JSON.parse(JSON.stringify(passesEditingToggle));
    updatedEditPassStatus[index] = true;
    setPassesEditingToggle(updatedEditPassStatus);
  }

  const handleConfirmButtonClick = (index) => {
    const updatedEditPassStatus = JSON.parse(JSON.stringify(passesEditingToggle));
    updatedEditPassStatus[index] = false;
    setPassesEditingToggle(updatedEditPassStatus);
  }

  const handleAddButtonClick = () => {
    const updatedPasses = JSON.parse(JSON.stringify(allPasses));
    updatedPasses.push(
      {
        passID: "",
        maxPersonsAdmitted: 0,
        status: "AVAILABLE",
      }
    )
    setAllPasses(updatedPasses);
  }

  const handleDeleteButtonClick = (index) => {
    const updatedEditPassStatus = JSON.parse(JSON.stringify(passesEditingToggle));
    updatedEditPassStatus.splice(index,1);
    setPassesEditingToggle(updatedEditPassStatus);

    const updatedPasses = JSON.parse(JSON.stringify(allPasses));
    updatedPasses.splice(index,1);
    setAllPasses(updatedPasses);
  }

  const handleValueChange = (e, index) => {
    const updatedPasses = JSON.parse(JSON.stringify(allPasses));
    updatedPasses[index][e.target.id] = e.target.value;
    setAllPasses(updatedPasses);
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                Pass ID
              </th>
              <th scope="col" className="py-3 px-6">
                Pass Admits
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span>Status</span>
                  <AddIconButton onAddButtonClick={handleAddButtonClick} />
                </div>
              </th>
            </tr>
          </thead>
          { 
            (passes === null || passes.length === 0)
            ? (
              <tbody>
                <tr>
                  <td className="p-4 bg-white rounded-lg md:p-8 col-span-3 text-gray-500 justify-center" >
                    No Passes Added
                  </td>
                </tr>
              </tbody>
            )
            : (
              <tbody>
                {
                  allPasses.map((pass, index) => 
                    (
                      passesEditingToggle[index] === true
                      ?  (
                        <tr className="bg-white divide-y">
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                            <input type="text" id="passID" onChange={e => handleValueChange(e, index)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" value={pass.passID} />
                          </th>
                          <td className="py-4 px-6">
                            <input type="number" id="maxPersonsAdmitted" onChange={e => handleValueChange(e, index)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" value={pass.maxPersonsAdmitted} />
                          </td>
                          <td className="py-4 px-6 bg-gray-100">
                            <div className="flex justify-between">
                              <PassStatusBadge status="AVAILABLE" />
                              <div>
                                <ConfirmIconButton onConfirmButtonClick={handleConfirmButtonClick} index={index} />
                                <DeleteIconButton onDeleteButtonClick={handleDeleteButtonClick} index={index} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                      : (
                        <tr className="bg-white divide-y">
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                            {pass.passID}
                          </th>
                          <td className="py-4 px-6">
                            {pass.maxPersonsAdmitted}
                          </td>
                          <td className="py-4 px-6 bg-gray-100">
                            <div className="flex justify-between">
                              <PassStatusBadge status={pass.status} />
                              {
                                pass.status === "AVAILABLE"
                                ? <EditIconButton onEditButtonClick={handleEditButtonClick} index={index} />
                                : null
                              }
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )
                }
              </tbody>
            )
          }
        </table>
      </div>
    </div>
  );
}

function PassStatusBadge({status}) {
  const statusToBadgeClass = {
    "AVAILABLE": "bg-green-100 text-green-800",
    "LOST": "bg-red-100 text-red-800", 
    "LOANED": "bg-blue-200 text-blue-800",
  };

  const badgeStatus = capitalizeFirstLetter(status.toLowerCase());

  return (
    <span className={`${statusToBadgeClass[status]} text-sm font-medium mx-3 px-2.5 py-0.5 rounded`}>{badgeStatus}</span>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function EditIconButton({onEditButtonClick, index}) {
  return (
    <button type="button" onClick={() => onEditButtonClick(index)} className="text-redPri hover:text-redSec">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    </button>
  );
}

function ConfirmIconButton({onConfirmButtonClick, index}) {
  return (
    <button type="button" onClick={() => onConfirmButtonClick(index)} className="text-redPri hover:text-redSec mr-3">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </button>
  );
}

function AddIconButton({onAddButtonClick}) {
  return (
    <button type="button" onClick={onAddButtonClick} className="text-redPri hover:text-redSec">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>  
    </button>
  );
}

function DeleteIconButton({onDeleteButtonClick, index}) {
  return (
    <button type="button" onClick={() => onDeleteButtonClick(index)} className="text-redPri hover:text-redSec">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}
