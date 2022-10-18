// @ts-nocheck
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { postLogin } from "src/api/login";
import { useUserContext } from "src/contexts/userContext";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

export default function login() {
  const { setIsUserLoggedIn, setUserRolesToStateAndSession, setCurrentUserEmailToStateAndSession } =
    useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postLogin(email, password);
    if (res.authorization) {
      sessionStorage.setItem("token", res.authorization);
      const decoded = jwt_decode(res.authorization);
      setUserRolesToStateAndSession(decoded.USER_ROLES);
      setCurrentUserEmailToStateAndSession(decoded.sub);
      setIsUserLoggedIn(true);
      history.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleCreateNewAccount = () => {
    history.push("/verify-email");
  }

  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='m-auto h-11/12 xl:h-1/2 w-11/12 xl:w-3/4 rounded-2xl shadow-xl flex flex-col xl:flex-row p-10 justify-between'>
        <form
          className='flex flex-col justify-between xl:mr-10 order-2 xl:order-1'
          onSubmit={handleSubmit}
        >
          <h2 className='text-3xl text-redPri font-bold'>Sign in to SSS Pass Service</h2>

          <div>
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Email
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
              <span className='text-redPri'>{error}</span>
            </div>
          </div>
          <div className='flex flex-col space-y-4'>
            <button
              type='submit'
              className='text-white bg-redPri hover:bg-redSec focus:ring-4 focus:outline-none focus:ring-grey font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              Submit
            </button>
            <button
              type='button'
              className='text-redPri bg-white border-redPri border hover:bg-grey focus:ring-4 focus:outline-none focus:ring-grey font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              onClick={handleCreateNewAccount}
            >
              Create New Account
            </button>
          </div>
        </form>
        <div className='flex xl:ml-2 w-full xl:w-3/5 h-full order-1 xl:order-2 mb-4 xl:mb-0 justify-center'>
          <img src='/loginBanner.jpg' alt='loginBanner' className='object-cover rounded-2xl' />
        </div>
      </div>
    </div>
  );
}
