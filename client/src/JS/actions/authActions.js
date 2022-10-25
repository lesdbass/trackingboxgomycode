import axios from 'axios';
import { LOGIN_USER, GET_AUTH_USER, USER_LOADING, LOGOUT_USER } from "../constant/actionType";
import { toast } from 'react-toastify';
//register user 

export const loginUser = (formData) =>async(dispatch)=>{
    dispatch(userLoading())
   
    try {
        const res = await axios.post('/api/login',formData)
        dispatch({
            type:LOGIN_USER,
            payload:res.data //user,msg,token,
        })
        // getAuthUser()
        toast.success(res.data.msg)
    
    } catch (error) {
        // console.dir(error)
        const  {errors} = error.response.data
        if(Array.isArray(errors)){
            errors.forEach((err)=>toast.error(err.msg))
        }    }
}

export const getAuthUser =() => async(dispatch)=>{
    try {
        //headers
        const config = {
            headers :{
                "x-auth-token" : localStorage.getItem('token')
            }
        }
        const res = await axios.get('/api/users',config)
        dispatch({
            type:GET_AUTH_USER,
            payload:res.data 
        })

    } catch (error) {
        console.log(error)
    }
}

export const userLoading = ()=>(dispatch)=>{
    dispatch({
        type:USER_LOADING
    })
}

export const userLogout =()=>(dispatch)=>{
    dispatch({
        type:LOGOUT_USER
    })
}