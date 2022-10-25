import { showLoading } from "../actions/SoldeeAction"
import {SOLDEE_GET,SHOW_LOADING,HIDE_LOADING} from "../constant/actionType"

const initState={
    soldee:[],
    loading:false,
    errors : []
}

const soldeeReducer =  (state=initState,{type,payload}) =>{
    switch(type) {
       case SOLDEE_GET: 
            
            return {...state, soldee:payload}
        case SHOW_LOADING : 
            return {...state , loading: true}
        case HIDE_LOADING :
            return {...state , loading : false}
  default : 
        return state
    }
}

export default soldeeReducer