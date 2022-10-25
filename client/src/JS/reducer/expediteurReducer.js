import {EXPEDITEUR_GET,EXPEDITEUR_GETONE} from "../constant/actionType"

const initState={
    exp:[],
    oneExp :{},
    loading:false,
    errors : []
}

const expReducer =  (state=initState,{type,payload}) =>{
    switch(type) {
       case EXPEDITEUR_GET: 
            
            return {...state, exp:payload, loading:true}
        case EXPEDITEUR_GETONE :
            return {...state , oneExp : payload}
            
  default : 
        return state
    }
}

export default expReducer
