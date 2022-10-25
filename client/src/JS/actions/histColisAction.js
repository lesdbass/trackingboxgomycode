import axios from "axios";

import {HISTCOLIS_GET} from "../constant/actionType"
//import { toast } from 'react-toastify';


export const HistColisGet = (trakingN) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/HistColis/${trakingN}`)
        // ,{params : formData})
        dispatch({type:HISTCOLIS_GET,payload:res.data.histColis})
    } catch (error) {
        // dispatch({type:GET_CONTACTS_FAIL,payload:error})${id}
    }
}
export const histColisAdd = (formData)=> async(dispatch) => {

    
    try {
        
        const res = await axios.post("/api/HistColis",formData)
        dispatch(HistColisGet())
        // toast.success(res.data.msg)
    } catch (error) {
       
           
}
}

