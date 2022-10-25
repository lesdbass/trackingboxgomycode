import axios from "axios";
import { GOUVERNORAT_ADD,GOUVERNORAT_DELETE,GOUVERNORAT_GET,GOUVERNORAT_ADD_VILLE,GET_VILLE,GET_RACINE_GOV } from "../constant/actionType";

export const govAdd = (formData) => async(dispatch)=> {
    try {
        const res = await axios.post("/api/gov",formData)

        // juste pour repmlir  state
        //dispatch({type : GOUVERNORAT_ADD , payload : res.data})
        dispatch(govGet())


    } catch (error) {
        console.log(error)
    }
}

export const govGet=(formData) => async(dispatch) => {
    try {
        
        const res = await axios.get("/api/gov",{params : formData})
        dispatch({type:GOUVERNORAT_GET,payload:res.data.gov})

        
    } catch (error) {
        console.log(error)
    }

}

export const villeGet =(formData) => async(dispatch) => {
    try {   
        
            const res = await axios.get('/api/ville' , {params : formData})

            dispatch({type:GET_VILLE,payload:res.data.gov.ville})
            dispatch({type:GET_RACINE_GOV,payload:res.data.gov.racine})

   
        } catch (error) {
        console.log(error)
    }
}



export const govDelete=(formData) => async(dispatch) => {
    try {

       const res = await axios.delete("/api/gov",{data : formData})
        //dispatch({type:GOUVERNORAT_DELETE,payload:res.data})
       if(formData.ville)
       {
        dispatch(govGet(formData))
        }
        else 
        {
            dispatch(govGet())
   
        }


    } catch (error) {
        console.log(error)
    }

}

export const govvillAdd = (formData) => async(dispatch)=> {
    try {
        const res = await axios.put("/api/gov",formData)
        dispatch(govGet(formData))
        //  dispatch({type : GOUVERNORAT_ADD_VILLE , payload : res.data})

    } catch (error) {
        console.log(error)
    }
}