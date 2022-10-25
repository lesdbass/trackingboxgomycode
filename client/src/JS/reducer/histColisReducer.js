import {HISTCOLIS_GET} from "../constant/actionType"

const initState={
    histColis:[],
    loading:false
}

const histColisReducer =  (state=initState,{type,payload}) =>{
    switch(type) {
       case HISTCOLIS_GET: 
            
            return {...state, histColis:payload, loading:true}
  default : 
        return state
    }
}

export default histColisReducer