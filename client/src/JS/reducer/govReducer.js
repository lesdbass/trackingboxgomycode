import {GOUVERNORAT_ADD,GOUVERNORAT_GET,GOUVERNORAT_DELETE,GOUVERNORAT_ADD_VILLE,GET_VILLE,GET_RACINE_GOV} from "../constant/actionType"

const initState={
    gov:[],
    ville:[],
    racine :0
}

const govReducer =  (state=initState,{type,payload}) =>{
    switch(type) {
       case GOUVERNORAT_GET: 
        return {...state, gov:payload}
    //    case GOUVERNORAT_DELETE :
    //     return {...state,payload}
        case GOUVERNORAT_ADD_VILLE :
            return {...state,gov:payload}
        case  GET_VILLE : 
             return {...state,ville:payload}
        case GET_RACINE_GOV :
            return {...state,racine:payload}
            
        default : 
        return state
    }
}

export default govReducer