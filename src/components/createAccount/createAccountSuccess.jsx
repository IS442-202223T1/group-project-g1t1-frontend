import { useHistory } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function CreateAccountSuccess({ email }) {
  const history = useHistory();

  const handleReturnToLogin = (e) => {
    e.preventDefault();
    history.push("/login?email=" + email);
  };

  return (
    <div className='fixed top-0 left-0 h-screen w-screen scale-100 backdrop-blur-sm z-8'>
      <div className='absolute flex flex-col justify-center space-y-5 m-auto w-1/2 h-1/4 bg-white z-99 inset-0 shadow-lg rounded-lg items-center text-center'>
        <CheckCircleIcon className='h-24 w-24 text-greenPri' />
        <span>Create account success!</span>
        <button
          type='button'
          className='bg-redPri hover:bg-redSec text-white rounded-lg px-4 py-2'
          onClick={handleReturnToLogin}
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}
