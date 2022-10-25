import axios from "axios";

import {RUNSHEET_GET} from "../constant/actionType"
import { toast } from 'react-toastify';


export const runsheetGet = () => async (dispatch) => {
    
    try {
        
            const res = await axios.get('/api/runsheet')
            dispatch({type : RUNSHEET_GET , payload : res.data.runsheet})
    } catch (error) {
                // dispatch({type:COLIS_GET,payload:error})

                console.log(error)
    }
} 

export const runsheetGetOne = (idRS) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/runsheetOne/${idRS}`)
        // ,{params : formData})
        dispatch({type:RUNSHEET_GET,payload:res.data.runsheet})
    } catch (error) {
        // dispatch({type:GET_CONTACTS_FAIL,payload:error})${id}
    }
}
export const runsheetAdd = (formData)=> async(dispatch) => {

    
    try {
        
        const res = await axios.post("/api/runsheet",formData)
        dispatch(runsheetGet())
        toast.success(res.data.msg)
    } catch (error) {
       console.log(error)
    //    const {errors} =error.response.data
       
    //    if(Array.isArray(errors)) 
    //    {
           
    //         errors.forEach((err)=> toast.error(err.msg))

    //    }
    
}
}
