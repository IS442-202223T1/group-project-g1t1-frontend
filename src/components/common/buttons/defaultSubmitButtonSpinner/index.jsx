import LoadingSpinner from "src/components/common/spinner/loadingSpinner";

export default function DefaultSubmitButtonSpinner({buttonName, onButtonClick, isLoading}) {
  return (
    <button 
      type="submit"
      onClick={onButtonClick}
      className='flex items-center justify-center text-white bg-redPri hover:bg-redSec focus:ring-2 focus:ring-grey font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-center'
    >
      {buttonName}
      {isLoading ? <LoadingSpinner /> : null}
    </button>
  )
}
