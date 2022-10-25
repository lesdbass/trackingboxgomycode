import React , {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { setupGet } from '../../../JS/actions/setupAction'
import UpdateSetup from './UpdateSetup'
const Setup = () => {

   const dispatch=useDispatch()
   const setup = useSelector((state) => state.setupReducer.setup )
  
   const [loading,setLoading] = useState(useSelector(state => state.setupReducer.loading))
   useEffect(()=> {
   dispatch(setupGet())

},[])
 
    
  return (
    <div style={{width : "600px"}}>
       {(loading) ? <h1>Table Setup Vide</h1> :  ((setup.fullName !="") ? <UpdateSetup />: <></>)} 



    </div>
  )
}

export default Setup