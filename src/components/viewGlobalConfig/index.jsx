import React, { useState, useEffect } from "react";
import GlobalConfig from "src/components/viewGlobalConfig/globalConfig";
import { useHistory } from "react-router-dom";
import { getGlobalConfig } from "src/api/globalConfig";

function ViewGlobalConfig() {
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const [globalconfigs, setGlobalConfig] = useState({
    id: 1,
    loanLimitPerMonth: 2,
    passLimitPerLoan: 2,
    letterHeadUrl: "",
    corporateMemberName: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const updateConfigHandler = (configState) => {};

  const toggleIsEditHandler = () => setIsEdit(!isEdit);
  const renderGlobalConfig = (value) => (
    <GlobalConfig
      configValues={globalconfigs}
      isEdit={isEdit}
      updateConfigHandler={updateConfigHandler}
      toggleIsEditHandler={toggleIsEditHandler}
    />
  );

  useEffect(() => {
    renderGlobalConfig();

    async function renderGlobalConfig() {
      const globalConfigRes = await getGlobalConfig(token);
      console.log(globalConfigRes);
      setGlobalConfig(globalConfigRes);
    }
  }, []);

  return (
    <div className='max-w-5xl mt-5 mx-auto'>
      <div className='flex justify-between items-center'>
        <span className='font-medium text-3xl'>View System Configuration</span>
      </div>
      <div className='w-10/12 max-w-5xl mt-5 p-5 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-5 mx-auto'>
        {renderGlobalConfig(globalconfigs)}
      </div>
    </div>
  );
}

export default ViewGlobalConfig;
