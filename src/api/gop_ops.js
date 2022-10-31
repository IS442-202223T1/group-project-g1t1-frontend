import axios from "axios";
import { GOP_OPS_ENDPOINT } from "./config";

const token = sessionStorage.getItem("token");
const axiosGopOpsInstance = axios.create({
    baseURL : GOP_OPS_ENDPOINT,
    timeout: 5000,
    headers : {"Authorization": `${token}`,}
});

export const collectCard = async(cardID) => {
    try {
        const res = await axiosGopOpsInstance.put("/collectCard",{
            cardID
        });
        if(res){
            return true;
        }
    }
    catch(error){
        return false;
    }
    return true;
}

export const returnCard = async(cardID) => {
    try {
        const res = await axiosGopOpsInstance.put("/returnCard",{
            cardID
        });
        if(res){
            return true;
        }
    }
    catch(error){
        return false;
    }
    return true;
}

export const markLost = async(cardID) => {
    try {
        const res = await axiosGopOpsInstance.put("/markLost",{
            cardID
        });
        if(res){
            return true;
        }
    }
    catch(error){
        return false;
    }
    return true;
}

export const getAllPasses = async() =>{
    try{
        const res = await axiosGopOpsInstance.get("/getAllPasses",);
        return res.data;
    }
    catch(error){
        return [];
    }
}