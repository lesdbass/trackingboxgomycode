import axios from "axios";

import {SOLDEE_GET,SHOW_LOADING,HIDE_LOADING} from "../constant/actionType"
import { toast } from 'react-toastify';
import Soldee from "../../component/Colis/Soldee";

export const soldeeGet = () => async (dispatch) => {
    
    try {
            const res = await axios.get('/api/soldee')
            dispatch({type : SOLDEE_GET , payload : res.data.soldee})


    } catch (error) {
                dispatch({type:SOLDEE_GET,payload:error})

    }
} 



// export const colisGetOne = (trakingN) => async (dispatch) => {
//     try {
//         const res = await axios.get(`/api/colisOne/${trakingN}`)
//         // ,{params : formData})
//         dispatch({type:COLIS_GET,payload:res.data.colis})
//     } catch (error) {
//         // dispatch({type:GET_CONTACTS_FAIL,payload:error})${id}
//     }
// }

export const soldeeAdd = (formData)=> async(dispatch) => {

    
    try {
        
        const res = await axios.post("/api/soldee",formData)
        dispatch(soldeeGet())
        toast.success(res.data.msg)
    } catch (error) {
       
    
}
}

export const soldeeGetOne = (numero) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/soldeeD/${numero}`)
        dispatch({type : SOLDEE_GET , payload : res.data.soldee})

        // ,{params : formData})
    } catch (error) {
        // dispatch({type:GET_CONTACTS_FAIL,payload:error})${id}
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


