import React from "react";
import {collectCard, returnCard, markLost} from "src/api/gop_ops";

export default function AvailablePassTile({date, cardID, email, contactNumber, passType, status}){
  return (
    <div className ="row">
    <div className="col-1">
    {date} 
    </div>
    <div className="col-1">
    {cardID}
    </div>
    <div className="col-3">
    {email}
    </div>
    <div className="col-2">
    {contactNumber}
    </div>
    <div className="col-1">
    {passType}
    </div>
    <div className="col-1">
    {status} 
    </div>
    <div className="col-3">
        <ActionButtons available = {status == "available"} cardID = {cardID}></ActionButtons>
    </div>
</div>
  )
}

export function ActionButtons({available, cardID}){
    const handleCollectCard = async(e) =>{
        e.preventDefault();
        collectCard(cardID);
    }

    const handleReturnCard = async(e) =>{
        e.preventDefault();
        returnCard(cardID);
    }

    const handleMarkLost = async(e) =>{
        e.preventDefault();
        markLost(cardID);
    }
    if(available){
        return(
            <div className="row">
            <button
          type='button'
          className='bg-green hover:bg-greenSec text-white rounded-lg px-4 py-2'
          onClick={handleReturnCard}
        >
          Return
        </button>
        <button
          type='button'
          className='bg-grey hover:bg-greySec text-white rounded-lg px-4 py-2'
          onClick={handleMarkLost}
        >
          Mark Lost
        </button>
        </div>
        
        );
    }
    return(
    <button
      type='button'
      className='bg-red hover:bg-redSec text-white rounded-lg px-4 py-2'
      onClick={handleCollectCard}
    >
      Collect
    </button>
    
    );
}