import React, {useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Button,Modal,Form, Table} from 'react-bootstrap'
import { toast } from 'react-toastify';
import {livGet,livGetOne} from '../../JS/actions/livreurAction'
import {colisGetOne} from '../../JS/actions/ColisAction'

const NewRunSheet = () => {
    const dispatch=useDispatch()
    const liv = useSelector((state) =>state.livReducer.liv)
    const colis=useSelector((state)=> state.colisReducer.colis)

    const [trakingN , setTrakingN]=useState("")
    const [rs,setRS]=useState(  {idRS : "",
    numero : "",
    nom : "",
    matricule : "",
    details :[] })



    const handledChange = (e) => {
      setTrakingN(e.target.value)
      // console.log(trakingN)
    }
  const addColisTab =() => {
      // console.log(trakingN)
      dispatch(colisGetOne(trakingN))
      // console.log(colis)
      if(colis.trakingN!=undefined ){
        rs.details.push({trakingN : colis.trakingN, nom : colis.nom ,adresse: colis.adresse+" "+colis.gouvernorat +" "+ colis.ville, telephone : colis.telephone + "/" + colis.telephone2 , total : colis.total})
      console.log("bassem" , rs)
      toast.success("Colis Ajouter avec succes")
      }
  }
  
    const selectLivreur = (e) => {
   
    } 


    useEffect(()=> {
        dispatch(livGet())
   //     chauff=liv
       // dispatch(expGetOne(colis.boutique))

        
    },[])

  return (

    <div>NewRunSheet
        <Form>
        { (liv) ? 
            <Form.Group className="mb-3" >
            <Form.Label>Livreur</Form.Label>

            <Form.Select aria-label="Default select example" onChange={(e)=>selectLivreur(e)}>
            <option>Merci de selectionner un Livreur</option>
              { (Array.isArray(liv)) ? liv.map((e)=> <option key={e.numero} value={e.numero}>{e.nom}</option> ) : <option>merci de selectionner un livreur</option> 
              }
            </Form.Select>
            </Form.Group>

        : <></>
        
        }

                <div>
                    <Form.Group className="mb-3" >
                    <Form.Label>Tracking  N</Form.Label>
                    <Form.Control style={{marginRight : "20px"}} type="text" name="trakingN" value={trakingN} placeholder="Enter Tracking N" onChange={(e)=> handledChange(e)} />
                    </Form.Group>
                    <Button variant="primary" onClick={addColisTab}>
                           Ajouter Colis
                    </Button>
                </div>

                  
        
        </Form>



        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tracking N</th>
          <th>Nom</th>
          <th>Adresse</th>
          <th>Telephone</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>

        

      {Array.isArray(rs.details) ? 
            rs.details.map((e) => (
                <tr>
                  <td>{e.trakingN}</td>
                  <td>{e.nom}</td>
                  <td>{e.adresse}</td>
                  <td>{e.telephone}</td>
                  <td>{e.total}</td>
               </tr>
            ))
        : 
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
     </tr>
        }
        
        </tbody>
        </Table>



    </div>
  )

}


export default NewRunSheet