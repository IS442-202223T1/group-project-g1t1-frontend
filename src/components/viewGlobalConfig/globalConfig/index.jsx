import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { useViewMembershipContext } from "src/contexts/viewMembershipContext";
// import { getMembershipDetails } from "src/api/borrower";
import DefaultSecondaryButton from "src/components/common/buttons/defaultSecondaryButton";
import { getGlobalConfig, updateGlobalConfig } from "src/api/globalConfig";

// export default function GlobalConfig({ idx, loanLimit, passLimit, letterHead, corporateMember }) {
export default function GlobalConfig(
  isEdit,
  toggleIsEditHandler,
) {
  const history = useHistory();
  const token = sessionStorage.getItem("token");

  // const [loanLimitValue, setLoanLimitValue] = useState(loanLimit);
  // const [passLimitValue, setPassLimitValue] = useState(passLimit);
  // const [letterHeadValue, setLetterHeadValue] = useState(letterHead);
  // const [corporateMemberValue, setCorporateMemberValue] = useState(corporateMember);

  // const onClickEditButton = () => {
  //   setIsEdit(!isEdit);
  // };
  const [loanLimitPerMonth, setLoanLimitPerMonth] = useState(0);
  const [passLimitPerLoan, setPassLimitPerLoan] = useState(0);
  const [letterHeadUrl, setLetterHeadUrl] = useState("");
  const [corporateMemberName, setCorporateMemberName] = useState("");

  const handleLoanLimitPerMonth = (e) => {
		e.preventDefault();
		setLoanLimitPerMonth(e.target.value);
	};

  const handlePassLimitLoan = (e) => {
		e.preventDefault();
		setPassLimitPerLoan(e.target.value);
	};

  const handleLetterHeadChange = (e) => {
		e.preventDefault();
		setLetterHeadUrl(e.target.value);
	};

  const handleCorporatePassChange = (e) => {
		e.preventDefault();
		setCorporateMemberName(e.target.value);
	};

  useEffect(() => {
    renderGlobalConfig();

    async function renderGlobalConfig() {
      const globalConfigRes = await getGlobalConfig(token);
      console.log(globalConfigRes);
      setLoanLimitPerMonth(globalConfigRes.loanLimitPerMonth);
      setPassLimitPerLoan(globalConfigRes.passLimitPerLoan);
      setLetterHeadUrl(globalConfigRes.letterHeadUrl);
      setCorporateMemberName(globalConfigRes.corporateMemberName);
    }
  }, []);

  const saveGlobalConfig = async (e) => {
		e.preventDefault();
		saveToDatabase();
		async function saveToDatabase() {
      const res = await updateGlobalConfig(token, loanLimitPerMonth, passLimitPerLoan, letterHeadUrl, corporateMemberName);
      if (res) {
        alert("Update successful!");
        history.push("/");
      }
		}
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
                onChange={handleLoanLimitPerMonth}
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
                onChange={handlePassLimitLoan}
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
                onChange={handleLetterHeadChange}
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
                onChange={handleCorporatePassChange}
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
            onClick={saveGlobalConfig}
            className='text-sm font-medium  text-redPri rounded-lg py-1 px-2 hover:text-redPriDark hover:bg-gray-200'
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}
