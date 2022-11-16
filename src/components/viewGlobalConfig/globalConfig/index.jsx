import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import { useViewMembershipContext } from "src/contexts/viewMembershipContext";
// import { getMembershipDetails } from "src/api/borrower";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";

// export default function GlobalConfig({ idx, loanLimit, passLimit, letterHead, corporateMember }) {
export default function GlobalConfig(
  configValues,
  isEdit,
  updateConfigHandler,
  toggleIsEditHandler,
) {
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const { loanLimitPerMonth, passLimitPerLoan, letterHeadUrl, corporateMemberName } = configValues;

  // const [loanLimitValue, setLoanLimitValue] = useState(loanLimit);
  // const [passLimitValue, setPassLimitValue] = useState(passLimit);
  // const [letterHeadValue, setLetterHeadValue] = useState(letterHead);
  // const [corporateMemberValue, setCorporateMemberValue] = useState(corporateMember);

  // const onClickEditButton = () => {
  //   setIsEdit(!isEdit);
  // };

  const handleLoanLimit = (e) => {
    updateConfigHandler(e.target.value);
  };

  const handlePassLimit = (e) => {
    updateConfigHandler(e.target.value);
  };

  const handleLetterHead = (e) => {
    updateConfigHandler(e.target.value);
  };

  const handleCorporateMemberValue = (e) => {
    updateConfigHandler(e.target.value);
  };

  return (
    <div className='mb-5 max-w-sm bg-white rounded-lg border border-gray-500 shadow-md hover:shadow-lg'>
      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Booking Configuration
        </h5>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          Loan Limit Per Month:
          {isEdit ? (
            <div>
              <input
                type='text'
                id='loanLimit'
                onChange={(e) => handleLoanLimit()}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg'
                value={loanLimitPerMonth}
              />
            </div>
          ) : (
            <div>{loanLimitPerMonth}</div>
          )}
        </p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          Pass Limit Per Loan:
          {isEdit ? (
            <div>
              <input
                type='text'
                id='passLimit'
                onChange={(e) => handlePassLimit()}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg'
                value={passLimitPerLoan}
              />
            </div>
          ) : (
            <div>{passLimitPerLoan}</div>
          )}
        </p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          Attacment Letter Head Image URL:
          {isEdit ? (
            <div>
              <input
                type='text'
                id='letterHead'
                onChange={(e) => handleLetterHead()}
                className='w-80 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg'
                value={letterHeadUrl}
              />
            </div>
          ) : (
            <div>{letterHeadUrl}</div>
          )}
        </p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          E-Pass Corporate Member Name:
          {isEdit ? (
            <div>
              <input
                type='text'
                id='corporateMember'
                onChange={(e) => handleCorporateMemberValue()}
                className='w-80 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg'
                value={corporateMemberName}
              />
            </div>
          ) : (
            <div>{corporateMemberName}</div>
          )}
        </p>
        <div className='justify-end'>
          <button
            type='button'
            onClick={toggleIsEditHandler}
            className='text-sm font-medium  text-redPri rounded-lg py-1 px-2 hover:text-redPriDark hover:bg-gray-200'
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}
