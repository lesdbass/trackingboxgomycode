import {SETUP_GET,SETUP_LOADING} from "../constant/actionType"

const initState={
    setup:{},
    loading:false
}

const setupReducer =  (state=initState,{type,payload}) =>{
    switch(type) {
        case SETUP_LOADING :
            return {...state, loading:true}
        case SETUP_GET: 
        return {...state,loading:false, setup:payload}
    //    case GOUVERNORAT_DELETE :
    //     return {...state,payload}
        // case GOUVERNORAT_ADD_VILLE :
        //     return {...state,gov:payload}
        // case  GOUVERNORAT_ADD : 
        //     return {...state,payload}
        default : 
             return state
    }
}

export default setupReducer