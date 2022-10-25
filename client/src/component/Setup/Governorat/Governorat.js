import React , {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Table} from 'react-bootstrap'
import AddGov from './AddGov'
import { govGet } from '../../../JS/actions/govAction'
import Govlines from './Govlines'

const Governorat = () => {
  const dispatch = useDispatch()

  const gov = useSelector((state) =>state.govReducer.gov)



   useEffect(()=>{
       dispatch(govGet())
   },[])


  return (
    <div>
    
      <AddGov />

<Table striped bordered hover size="sm">
  <thead>
    <tr>
    
      <th width="100">.: Racine</th>
      <th width="100" >.: Nom</th>
      <th width="100">.: Ville</th>
      <th width="100">.: Supprimer</th>
    </tr>
  </thead>
  <tbody>
  {
    ((Array.isArray(gov))) ?  gov.map((el)=> <Govlines key={el._id} gov={el} />) : <Govlines key={gov._id} gov={gov} /> }

   

  </tbody>
</Table>

    </div>
  )
}

export default Governorat