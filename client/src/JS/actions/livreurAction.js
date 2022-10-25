import axios from "axios";

import {LIVREUR_GET} from "../constant/actionType"
import { toast } from 'react-toastify';


export const livGet=() => async (dispatch) =>
{
    try {
        
        const res = await axios.get("/api/livreur")
        // ,{params : formData})
        dispatch({type:LIVREUR_GET,payload:res.data.livreur})
    
    } catch (error) {
        dispatch({type:LIVREUR_GET,payload:error})
        console.log(error)
    }

}
export const livGetOne = (numero) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/livreur/${numero}`)
        // ,{params : formData})
        dispatch({type:LIVREUR_GET,payload:res.data.livreur})
    } catch (error) {
        // dispatch({type:GET_CONTACTS_FAIL,payload:error})${id}
    }
}

export const livAdd = (formData)=> async(dispatch) => {

    
    try {
        const res = await axios.post("/api/livreur",formData)
        dispatch(livGet())
        toast.success(res.data.msg)
    } catch (error) {
       const errors =error.response.data.error
       if(Array.isArray(errors)) 
       {
           
            errors.forEach((err)=> toast.error(err.msg))

       }
    
}
}

export const updateLiv=(numero,exp) => async (dispatch) => {

    try {
            // console.log(numero,exp)
                const res = await axios.put(`/api/livreur/${numero}`,exp)
            dispatch(livGet())

            
    } catch (error) {
        console.log(error)
    }
}