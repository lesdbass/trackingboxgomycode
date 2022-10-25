import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { govAdd,govGet } from '../../../JS/actions/govAction'

const AddGov= () => {
  const dispatch = useDispatch()
  const [nom , setNom]=useState("")
  const [racine , setRacine] = useState(0)
  const [ville, setVille]=useState([])


  

    const addgov =()=> {
            dispatch(govAdd({nom,racine}))
            setRacine(0)
            setNom("")
           // dispatch(govGet())

                      
    }
  
    return (
    <div style={{width:"300px", marginLeft:"auto" , marginRight: "auto" ,marginBottom : "20px" , marginTop : "20px" , display:"flex"}}>
        
<Form>
<div>
    <Form.Group className="mb-1" >
        <Form.Label> <h5>Gouvernorat</h5></Form.Label>
        <Form.Control type="text" nom="nom" value={nom} onChange={(e)=> setNom(e.target.value)} placeholder="Entrer Governorat" />
    </Form.Group>
    </div>
      <div>
    <Form.Group className="mb-1" >
        <Form.Label><h5>Racine</h5></Form.Label>
        <Form.Control type="number" nom="racine" value={racine} onChange={(e)=> setRacine(e.target.value)} placeholder="Entrer racine" />
    </Form.Group>
    </div>
    <div>
  <Button variant="primary" onClick={()=>{addgov()}} >
    Ajouter
  </Button>
  </div>
</Form>

    </div>
  )
}

export default AddGov