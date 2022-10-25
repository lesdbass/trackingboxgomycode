import {RUNSHEET_GET} from "../constant/actionType"

const initState={
    runsheet:[],
    loading:false,
    errors : []
}

const runsheetReducer =  (state=initState,{type,payload}) =>{
    switch(type) {
       case RUNSHEET_GET: 
            
            return {...state, runsheet:payload, loading:true}
  default : 
        return state
    }
}

export default runsheetReducer
