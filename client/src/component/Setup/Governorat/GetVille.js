import React, {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Table,Button,Form} from 'react-bootstrap'
import { govGet,govvillAdd,govDelete } from '../../../JS/actions/govAction'

const GetVille = ({nom}) => {
    const dispatch=useDispatch()
    const [ville,setVille]=useState('')

    const gov=useSelector((state) => state.govReducer.gov )
 useEffect(() => {
     dispatch(govGet({nom}))
    
 },[])   

 const addVille= () => {
    dispatch(govvillAdd({nom,ville}))
    setVille("")
     dispatch(govGet({nom}))

 }
  return (
      <>
         <div style={{width:"300px", textAlign:"center"}}>
        
        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>Ville</Form.Label>
                <Form.Control type="text" nom="ville" value={ville} onChange={(e)=> setVille(e.target.value)} placeholder="Entrer une ville" />
            </Form.Group>
          <Button variant="primary" onClick={()=>{addVille()}} >
            Ajouter
          </Button>
          
        </Form>    
    </div>



<Table striped bordered hover>
  <thead>
    <tr>
      <th>Ville</th>
      <th>Supprimer</th>
    </tr>
  </thead>
  <tbody>


  {    (Array.isArray(gov.ville)) ?  gov.ville.map((ville)=> <tr key={ville}><td>{ville}</td><td><Button variant="danger" onClick={() => dispatch(govDelete({nom,ville}))}>Supprimer</Button></td> </tr> ) : <tr><td></td><td></td> </tr>  }
  {/* 

    */}

    
  </tbody>
</Table>
</>
  )
}

export default GetVille