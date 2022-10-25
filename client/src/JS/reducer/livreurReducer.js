import {LIVREUR_GET} from "../constant/actionType"

const initState={
    liv:[],
    loading:false,
    errors : []
}

const livReducer =  (state=initState,{type,payload}) =>{
    switch(type) {
       case LIVREUR_GET: 
            return {...state, liv:payload, loading:true}
  default : 
        return state
    }
}

export default livReducer
