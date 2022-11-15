import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { createNewMembership } from "src/api/membership";
import { EditIconButton, ConfirmIconButton, AddIconButton, DeleteIconButton } from "src/components/common/buttons/iconButtons";
import BackButton from "src/components/common/buttons/backButton";
import { DefaultPhysicalEmailTemplate, DefaultElectronicEmailTemplate, EmailVariables } from "../defaultEmailTemplate";
import { DefaultPhysicalAttachmentTemplate, DefaultElectronicAttachmentTemplate, ElectronicAttachmentVariables, PhysicalAttachmentVariables } from "../defaultAttachmentTemplate";
import DefaultSubmitButton from "../common/buttons/defaultSubmitButton";

export default function CreateMembership() {
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [membershipGrade, setMembershipGrade] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [emailTemplate, setEmailTemplate] = useState(DefaultPhysicalEmailTemplate);
  const [attachmentTemplate, setAttachmentTemplate] = useState(DefaultPhysicalAttachmentTemplate);
  const [emailPreview, setEmailPreview] = useState(false);
  const [attachmentPreview, setAttachmentPreview] = useState(false);
  const [fee, setFee] = useState(0);
  const [passType, setPassType] = useState("physical");

  const [passes, setPasses] = useState([]);

  const setElectronicPass = () => {
    setEmailTemplate(DefaultElectronicEmailTemplate);
    setAttachmentTemplate(DefaultElectronicAttachmentTemplate);
    setPassType("electronic");
  }

  const setPhysicalPass = () => {
    setEmailTemplate(DefaultPhysicalEmailTemplate);
    setAttachmentTemplate(DefaultPhysicalAttachmentTemplate);
    setPassType("physical");
  }

  const valueSetters = {
    name: setName,
    desc: setDescription,
    img: setImageUrl,
    emailTemplate: setEmailTemplate,
    attachmentTemplate: setAttachmentTemplate,
    membershipGrade: setMembershipGrade,
    logoUrl: setLogoUrl,
    fee: setFee,
    electronic: setElectronicPass,
    physical: setPhysicalPass,
    address: setAddress,
  }

  const handleValueChange = (e) => {
    e.preventDefault();
    valueSetters[e.target.id](e.target.value);
  }

  const toggleEmailPreview = () => {
    setEmailPreview(!emailPreview);
  }

  const toggleAttachmentPreview = () => {
    setAttachmentPreview(!attachmentPreview);
  }

  const onBackButtonClicked = () => {
    history.push("/");
  }

  const onSubmitButtonClicked = async (e) => {
    e.preventDefault();
    const newEmail = {};
    newEmail.templateContent = emailTemplate;
    const newAttachment = {};
    newAttachment.templateContent = attachmentTemplate;

    const body = {
      membershipName: name,
      membershipAddress: address,
      description,
      imageUrl,
      emailTemplate: newEmail,
      attachmentTemplate: newAttachment,
      replacementFee: fee,
      isElectronicPass: passType === "electronic",
      corporatePasses: passes,
      isActive: true,
    };

    if (passType === "electronic") {
      body.membershipGrade = membershipGrade;
      body.logoUrl = logoUrl;
    }

    const res = await createNewMembership(token, body);
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
          <label htmlFor="passType" className="block mb-2 text-sm font-medium text-gray-900">Pass Type</label>
          <div className="flex mb-6 justify-around" id="passType">
            <div className="flex items-center p-2 w-full max-w-sm rounded border border-gray-200 hover:border-redPri">
              <input checked={passType === "electronic"} id="electronic" type="radio" onChange={handleValueChange} value="electronic" name="bordered-radio" className="w-4 h-4 text-redPri bg-gray-100 border-gray-300" />
              <label htmlFor="electronic" className="py-4 ml-2 w-full text-sm font-medium text-gray-900">Electronic Pass</label>
            </div>
            <div className="flex items-center p-2 w-full max-w-sm rounded border border-gray-200 hover:border-redPri">
              <input checked={passType === "physical"} id="physical" type="radio" onChange={handleValueChange} value="physical" name="bordered-radio" className="w-4 h-4 text-redPri bg-gray-100 border-gray-300" />
              <label htmlFor="physical" className="py-4 ml-2 w-full text-sm font-medium text-gray-900">Physical Pass</label>
            </div>
          </div>
          {
            passType === "electronic" ? (
              <>
                <EPassMembershipGrade handleValueChange={handleValueChange} membershipGrade={membershipGrade} />
                <EPassLogoUrl handleValueChange={handleValueChange} logoUrl={logoUrl} />
              </>
            ) : null
          }
          <div className="mb-6">
            <span className="block mb-2 text-sm font-medium text-gray-900">Corporate Passes</span>
            <PassTableForm passes={passes} setPasses={setPasses} passType={passType} />
          </div>
          <div className="mb-6">
            <label htmlFor="emailTemplate" className="block mb-2 text-sm font-medium text-gray-900">Entry to Attraction Email Template</label>
            {
              emailPreview ? 
              <div dangerouslySetInnerHTML={{ __html: emailTemplate}} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
              : 
              <textarea rows={10} id="emailTemplate" onChange={handleValueChange} value={emailTemplate} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Leave a description..." required />
            }
            <div className="flex justify-between my-2">
              <span className="text-sm text-darkGrey">{"Variables: " + EmailVariables}</span>
              <button type="button" onClick={toggleEmailPreview} className="text-sm font-medium  text-redPri rounded-lg py-1 px-2 hover:text-redPriDark hover:bg-gray-200">{emailPreview ? "Edit" : "Preview"}</button>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="attachmentTemplate" className="block mb-2 text-sm font-medium text-gray-900">Authorisation Letter Attachment Template</label>
            {
              attachmentPreview ? 
              <div dangerouslySetInnerHTML={{ __html: attachmentTemplate}} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
              : 
              <textarea rows={10} id="attachmentTemplate" onChange={handleValueChange} value={attachmentTemplate} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Leave a description..." required />
            }
            <div className="flex justify-between my-2">
              {passType === "electronic" ? <span className="text-sm text-darkGrey">{"Variables: " + ElectronicAttachmentVariables}</span> : <span className="text-sm text-darkGrey">{"Variables: " + PhysicalAttachmentVariables}</span>}
              <button type="button" onClick={toggleAttachmentPreview} className="text-sm font-medium  text-redPri rounded-lg py-1 px-2 hover:text-redPriDark hover:bg-gray-200">{attachmentPreview ? "Edit" : "Preview"}</button>
            </div>
          </div>
          <DefaultSubmitButton buttonName="Create Membership" onButtonClick={onSubmitButtonClicked} />
        </form>
      </div>
    </div>
  )
}

function PassTableForm({passes, setPasses, passType}) {
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
    switch (e.target.id) {
      case ("passID"):
        if (e.target.value.length <= 22) {
          updatedPasses[index].passID = e.target.value;
        }
        break;
      default:
        updatedPasses[index][e.target.id] = e.target.value;
    }
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
              {
                passType === "electronic" ?
                (
                  <>
                    <th scope="col" className="py-3 px-6 bg-gray-50">Expiry Date</th>
                    <th scope="col" className="py-3 px-6">
                      <div className="flex justify-between items-center">
                        <span>Status</span>
                        <AddIconButton onAddButtonClick={handleAddButtonClick} />
                      </div>
                    </th>
                  </>
                )
                :
                (
                  <th scope="col" className="py-3 px-6 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span>Status</span>
                      <AddIconButton onAddButtonClick={handleAddButtonClick} />
                    </div>
                  </th>
                )
              }
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
                          {
                            passType === "electronic" ?
                            (<td className="py-4 px-6">
                              <input type="date" id="expiryDate" onChange={e => handleValueChange(e, index)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" value={pass.expiryDate} />
                            </td>)
                            : null
                          }
                          <td className="py-4 px-6 bg-gray-100">
                            <div className="flex justify-between">
                              <PassStatusBadge status="AVAILABLE" />
                              <div>
                                <ConfirmIconButton onConfirmButtonClick={() => handleConfirmButtonClick(index)} />
                                <DeleteIconButton onDeleteButtonClick={() => handleDeleteButtonClick(index)} />
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
                          {
                            passType === "electronic" ?
                            (<td className="py-4 px-6">
                              {pass.expiryDate}
                            </td>)
                            : null
                          }
                          <td className="py-4 px-6 bg-gray-100">
                            <div className="flex justify-between">
                              <PassStatusBadge status={pass.status} />
                              {
                                pass.status === "AVAILABLE"
                                ? <EditIconButton onEditButtonClick={() => handleEditButtonClick(index)}/>
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

function EPassMembershipGrade({handleValueChange, membershipGrade}) {
  return (
    <div className="mb-6">
      <span className="block mb-2 text-sm font-medium text-gray-900">Membership Grade</span>
      <input type="text" id="membershipGrade" onChange={handleValueChange} value={membershipGrade} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add a membership grade" required />
    </div>
  );
}

function EPassLogoUrl({handleValueChange, logoUrl}) {
  return (
    <div className="mb-6">
      <span className="block mb-2 text-sm font-medium text-gray-900">Logo URL</span>
      <input type="text" id="logoUrl" onChange={handleValueChange} value={logoUrl} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add a logo url (e.g. https://image.location.com)" required />
    </div>
  );
}
