import { useState } from "react";
import { useLocation } from "react-router-dom";
import CreateAccountSuccess from "./createAccountSuccess";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [createSuccess, setCreateSuccess] = useState(false);

  const { search } = useLocation();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const queryEmail = new URLSearchParams(search).get("email");
    const tempErrors = [];
    if ( queryEmail === null) {
      tempErrors.push("Unable to fulfil request. Please use the link that was sent to your email.")
    } else {
      setEmail(queryEmail);
    }
    // TODO: make api call to create account
    if (tempErrors.length) {
      setErrors(tempErrors);
      return;
    }
    setCreateSuccess(true);
  };

  return (
    <div className='w-screen h-screen flex flex-col'>
      {createSuccess ? <CreateAccountSuccess email={email}/> : null}
      <div className='m-auto h-11/12 xl:h-1/2 w-11/12 xl:w-3/4 rounded-2xl shadow-xl p-10'>
        <form className='flex flex-col justify-between h-full' onSubmit={handleSubmit}>
          <h2 className='text-3xl text-redPri font-bold'>Create New Account</h2>

          <div className='xl:w-1/2 m-auto'>
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={handleNameChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-redPri focus:border-redPri block w-full p-2.5'
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='contactNumber'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Contact Number
              </label>
              <input
                type='tel'
                id='contactNumber'
                value={contactNumber}
                onChange={handleContactNumberChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-redPri focus:border-redPri block w-full p-2.5'
                placeholder="e.g. 91234567"
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={handlePasswordChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-redPri focus:border-redPri block w-full p-2.5'
              />
            </div>
            <div className='flex flex-col space-y-4'>
              <button
                type='submit'
                className='text-white bg-redPri hover:bg-redSec focus:ring-4 focus:outline-none focus:ring-grey font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              >
                Create New Account
              </button>
              <div className="text-redPri text-sm">
                {errors.map((error) => (<p>{error}</p>))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
