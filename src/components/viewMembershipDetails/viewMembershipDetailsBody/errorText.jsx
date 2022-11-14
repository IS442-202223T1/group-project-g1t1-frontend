import React from "react";

import "react-datepicker/dist/react-datepicker.css";




export default function ResponseText({statusCode, message,}) {

        if(statusCode === 200){
            return (
                <div>
                    <text className="bg-green-100">Your booking was successful. Enjoy your trip!</text>
                </div>
            )
        }
        if(statusCode === 409){
            return(<div>
                    <text className="bg-redPri text-white">Unable to book this attraction as there are not enough passes on that day.</text>
            </div>)
        }
        if(statusCode === 400){
            return(<div>
                    <text className="bg-redPri text-white">{message}</text>
            </div>)
        }
        return null;
}
