import axios from "axios";

import {COLIS_GET,SHOW_LOADING,HIDE_LOADING,COLIS_GETONE} from "../constant/actionType"

import { toast } from 'react-toastify';

export const colisGet = () => async (dispatch) => {
    
    try {
        
            const res = await axios.get('/api/colis')
            dispatch({type : COLIS_GET , payload : res.data.colis})
    } catch (error) {
                dispatch({type:COLIS_GET,payload:error})

    }
} 

export const colisGetOne = (trakingN) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/colisOne/${trakingN}`)
        // ,{params : formData})
        dispatch({type:COLIS_GETONE,payload:res.data.colis})
    } catch (error) {
        // dispatch({type:GET_CONTACTS_FAIL,payload:error})${id}
    }
}

export const  colisGetLivree =(boutique) => async (dispatch) => {
    try {
            // const res = await axios.get(`/api/colislivre/${boutique}`)
            axios.get(`/api/colislivre/${boutique}`).then(res=> {
                dispatch({type:COLIS_GET,payload : res.data.colis})
            })
            

    }catch{

    }
}



export const colisAdd = (formData)=> async(dispatch) => {

    
    try {
        
        const res = await axios.post("/api/colis",formData)
        dispatch(colisGet())
        toast.success(res.data.msg)
    } catch (error) {
       
       const {errors} =error.response.data
       
       if(Array.isArray(errors)) 
       {
           
            errors.forEach((err)=> toast.error(err.msg))

       }
    
}
}

export const updateColis=(trakingN,cls) => async (dispatch) => {

    try {
            
                const res = await axios.put(`/api/colis/${trakingN}`,cls)
            // dispatch(colisGet())

            
    } catch (error) {
        console.log(error)
    }
}

export const colisDel =(trakingN) => async (dispatch) => {
    try {
        const res=await axios.delete(`/api/colis/${trakingN}`)
        dispatch(colisGet())
    } catch (error) {
        
    }
}

export const showLoading =() => async (dispatch) => {
    dispatch({
        type: SHOW_LOADING
    })
}


export const hideLoading =() => async (dispatch) => {
    dispatch({
        type: HIDE_LOADING
    })
}
