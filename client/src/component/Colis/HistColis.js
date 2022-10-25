import React, {useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {setupGet} from '../../JS/actions/setupAction'
import {Button,Modal,Form} from 'react-bootstrap'
import { colisGetOne,updateColis } from '../../JS/actions/ColisAction'
import {histColisAdd} from '../../JS/actions/histColisAction'
import { toast } from 'react-toastify';

const HistColis = () => {
    const dispatch=useDispatch()
    const defaultStatus = useSelector((state) =>state.setupReducer.setup)
    const [valueHC, setNewvalueHC] =useState({trakingN:"",status : ""})
    const colis=useSelector((state)=> state.colisReducer.colisOne)



    useEffect(()=> {
      dispatch(setupGet())
  
    },[])

    const handledChangevHC = (e) => {
      setNewvalueHC({...valueHC,[e.target.name] : e.target.value})
     // 
      //console.log(newExp)
    }

    const handledChangeStatus = (e) => {
      setNewvalueHC({...valueHC,"status" : e.target.value})
     // 
      //console.log(newExp)
    }
    
    

    const saveDetails =() => {
      //  console.log(valueHC.trakingN)
      dispatch(colisGetOne(valueHC.trakingN))
      // console.log(colis)
      if(colis.trakingN)
      {
        // console.log(valueHC)

        dispatch(histColisAdd(valueHC))
        
        setNewvalueHC({trakingN:"",status : ""})
        toast.success("enregistrement effectuer")
      }
    //   if(dt.description !== "" && dt.qty > 0)
    //   {
    //       dt.tot=dt.qty*dt.prix
    //       newColis.details.push(dt)
    //       newColis.total=newColis.total+dt.tot
    //       // console.log(newColis.details)
  
    //       setDt({description : "" , qty : 0 , prix : 0 , tot : 0})
    //   }
    //   else{
    //     toast.error("Description et quantité obligatoire")
    //   }
   }
  



  return (
    <div style={{width : "300px" , margin:"Auto"}}>
        <h1>changement status Colis </h1>
        {/* <p>{defaultStatus.statusColis}</p> */}
    
    <div Style={{width : "300px"}}>
    <Form>
                   <Form.Group className="mb-3" >
                <Form.Label>Status</Form.Label>

                <Form.Select aria-label="Default select example" onChange={(e)=>handledChangeStatus(e)}>
                <option>Merci de selectionner un Status</option>
                  { (Array.isArray(defaultStatus.statusColis)) ? defaultStatus.statusColis.map((e)=> <option key={e.code} value={e.name} >{e.name}</option> ) : <option>merci de selectionner un Status</option> 
                  }
                </Form.Select>
                </Form.Group>


                <div>
                    <Form.Group className="mb-3" >
                    <Form.Label>Tracking N°</Form.Label>
                    <Form.Control style={{marginRight : "20px"}} type="text" name="trakingN" value={valueHC.trakingN} placeholder="Enter Tracking N" onChange={(e)=> handledChangevHC(e)} />
                    </Form.Group>
                </div>

                <Button variant="primary" onClick={()=>{saveDetails()}}>
                      Ajouter
                  </Button>

     </Form>
     </div>

    

    </div>
  )
}

export default HistColis