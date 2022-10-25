import axios from "axios";

import {EXPEDITEUR_GET,EXPEDITEUR_GETONE} from "../constant/actionType"
import { toast } from 'react-toastify';


export const expGet=() => async (dispatch) =>
{
    try {
        
        const res = await axios.get("/api/expediteur")
        // ,{params : formData})
        dispatch({type:EXPEDITEUR_GET,payload:res.data.expediteur})
    
    } catch (error) {
        dispatch({type:EXPEDITEUR_GET,payload:error})
        console.log(error)
    }

}
export const expGetOne = (name) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/exp/${name}`)
        // ,{params : formData})
        dispatch({type:EXPEDITEUR_GETONE,payload:res.data.expediteur})
    } catch (error) {
        // dispatch({type:GET_CONTACTS_FAIL,payload:error})${id}
    }
}

export const expAdd = (formData)=> async(dispatch) => {

    
    try {
        
        const res = await axios.post("/api/expediteur",formData)
        dispatch(expGet())
        toast.success(res.data.msg)
    } catch (error) {
       
       const {errors} =error.response.data
       
       if(Array.isArray(errors)) 
       {
           
            errors.forEach((err)=> toast.error(err.msg))

       }
    
}
}

export const updateExp=(numero,exp) => async (dispatch) => {

    try {
            // console.log(numero,exp)
                const res = await axios.put(`/api/expediteur/${numero}`,exp)
            dispatch(expGet())

            
    } catch (error) {
        console.log(error)
    }
}