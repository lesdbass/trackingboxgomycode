import { showLoading } from "../actions/SoldeeAction"
import {COLIS_GET,SHOW_LOADING,HIDE_LOADING,COLIS_GETONE} from "../constant/actionType"

const initState={
    colis:[],
    loading:false,
    colisOne:{},
    errors : []
}

const colisReducer =  (state=initState,{type,payload}) =>{
    switch(type) {
       case COLIS_GET: 
    
            return {...state, colis:payload}
        case  COLIS_GETONE :
            return {...state, colisOne:payload}
        case SHOW_LOADING :
            return {...state , loading:true}
        case HIDE_LOADING : 
            return {...state , loading:false}
        default : 
        return state
    }
}

export default colisReducer