import React, { useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { getAllPasses } from "src/api/gop_ops";

import BackButton from "src/components/common/buttons/backButton";

export default function GopPassesDashboard() {
    const history = useHistory();

    const [passes, setPasses] = useState([]);

    useEffect(()=>{
        getAllPasses().then(items =>{
            console.log(items);
            setPasses(items);
        })
    },[]);

    const onBackButtonClicked = () => {
        history.goBack();
    }

    return (
        <div className="max-w-5xl mt-5 mx-auto">
      <div className="flex justify-around items-center">
      <ul>
                {passes.map(pass =><li> a </li>)}
            </ul>
      </div>
      
    </div>
        // <div className = "wrapper">
        //     <ul>
        //         {passes.map(pass =><li> {pass}</li>)}
        //     </ul>
        // </div>
        // <div className = "max-w-5x1 mt-5 mx-auto">
        //     <div className = "flex items-center mb-5">
        //         <BackButton onClick={onBackButtonClicked} />

        //     </div>
        //     <div className = "mt-5 p-5 mx-auto">
        //         {/* attraction name */}
        //         {/* bookings section */}
        //         {/* 1 1 3 2 1 1 3 */}
        //         <div className ="row">
        //             <div className="col-1">
        //             Date 
        //             </div>
        //             <div className="col-1">
        //             Pass ID 
        //             </div>
        //             <div className="col-3">
        //             Email ID
        //             </div>
        //             <div className="col-2">
        //             Contact No. 
        //             </div>
        //             <div className="col-1">
        //             Pass Type
        //             </div>
        //             <div className="col-1">
        //             Status 
        //             </div>
        //             <div className="col-3">
        //             Actions 
        //             </div>
        //         </div>
        //         {/* list of bookings */}
        //     </div>
        // </div>
    );
}