import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createNewMembership } from "src/api/membership";
import DefaultSubmitButton from "../common/buttons/defaultSubmitButton";

function CreateMembership() {
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState(0);
  const [passType, setPassType] = useState("physical");

  const valueSetters = {
    name: setName,
    desc: setDescription,
    fee: setFee,
    electronic: setPassType,
    physical: setPassType,
  }

  const handleValueChange = (e) => {
    e.preventDefault();
    valueSetters[e.target.id](e.target.value);
  }

  const onButtonClicked = async (e) => {
    e.preventDefault();
    const res = await createNewMembership(token, name, description, fee, passType);
    if (res) {
      history.push("/")
    }
  }

  return (
    <div className="max-w-5xl mt-5 mx-auto">
      <h1 className="font-medium text-3xl">Add a New Membership</h1>
      <div className="mt-5 p-5">
        <form>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Memebership Name</label>
            <input type="text" id="name" onChange={handleValueChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Mandai Wildlife Reserve" required />
          </div>
          <div className="mb-6">
            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900">Membership Description</label>
            <input type="text" id="desc" onChange={handleValueChange}className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Leave a description..." required />
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
          <DefaultSubmitButton buttonName="Create Membership" onButtonClick={onButtonClicked} />
        </form>
      </div>
    </div>
  )
}

export default CreateMembership;
