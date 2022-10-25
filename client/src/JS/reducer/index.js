import {combineReducers} from "redux";
import govReducer from "./govReducer";
import setupReducer from "./setupReducer";
import expReducer from "./expediteurReducer"
import livReducer from "./livreurReducer";
import colisReducer from "./colisReducer";
import runsheetReducer from "./runsheetReducer"
import soldeeReducer from "./SoldeeReducer";
import authReducer from "./authReducer";


const rootReducer = combineReducers({govReducer , setupReducer,expReducer,livReducer,colisReducer,runsheetReducer,soldeeReducer,authReducer})


export default rootReducer;