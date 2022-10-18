import { useState } from "react";
import SendEmailSuccess from "./sendEmailSuccess";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: make api call to send verification email
    setEmailSuccess(true);
  };

  return (
    <div className='w-screen h-screen flex flex-col'>
      {emailSuccess ? <SendEmailSuccess /> : null}
      <div className='m-auto h-11/12 xl:h-1/2 w-11/12 xl:w-3/4 rounded-2xl shadow-xl p-10'>
        <form className='flex flex-col justify-between h-full' onSubmit={handleSubmit}>
          <h2 className='text-3xl text-redPri font-bold'>Create New Account</h2>

          <div className='xl:w-1/2 m-auto'>
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                SSS Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={handleEmailChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-redPri focus:border-redPri block w-full p-2.5'
                placeholder='name@sportsschool.edu.sg or @nysi.org.sg'
              />
            </div>
            <div className='flex flex-col space-y-4'>
              <button
                type='submit'
                className='text-white bg-redPri hover:bg-redSec focus:ring-4 focus:outline-none focus:ring-grey font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              >
                Send Verification Email
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
