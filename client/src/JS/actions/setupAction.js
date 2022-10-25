import axios from "axios";
import {SETUP_GET,SETUP_LOADING} from '../constant/actionType'

export const setupGet =() => async (dispatch) => {
    dispatch({type:SETUP_LOADING})
    try {

            const res = await axios.get("/api/setup")
            dispatch({type:SETUP_GET,payload:res.data.setup})

    } catch (error) {
        console.log(error)
    }

}


export const setupUpdate = (formData) => async (dispatch) => {

    try {
        //console.log(formData)
        const res = await axios.put("/api/setup",formData)
        
        dispatch(setupGet())

    } catch (error) {
        console.log(error)
        
    }


}

export const addStatus= (formdata) => async (dispatch) => {
   
    try {
            const res = await axios.post("/api/setup" , formdata)
             dispatch(setupGet())
           // console.log(formdata)


    } catch (error) {
        console.log(error)

    }
}

export const setupDelStatus = (formdata) => async (dispatch) => {
    try {
        const res = await axios.delete("/api/setup",{data : formdata})
         await dispatch(setupGet())
    } catch (error) {
        console.log(error)
    }
}