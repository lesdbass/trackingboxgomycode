import React, {useEffect,useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { useSelector,useDispatch } from 'react-redux'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory  from 'react-bootstrap-table2-editor'
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter'
import {Button,Modal,Form} from 'react-bootstrap'
import { toast } from 'react-toastify';

import {expAdd, expGet,updateExp} from '../../../JS/actions/expediteurAction'
import {setupGet} from '../../../JS/actions/setupAction'
import {govGet,villeGet} from '../../../JS/actions/govAction'

const Expediteur = () => {

  const dispatch=useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const exp = useSelector((state) =>state.expReducer.exp)
  const setup = useSelector((state) => state.setupReducer.setup)
  const gov=useSelector((state) => state.govReducer.gov)
  const ville=useSelector((state)=> state.govReducer.ville)

  const [newExp,setNewExp] =useState ({numero : "" , name : "" , telephone :"" ,prixLivraison : 0 , prixRetour : 0, rib:"" , banque : "" , adresse :"" ,codeTVA : "" , email :"" , login: "" , commentaire :"" , gov : "" , ville : ""})
  const [pwd,setPwd]=useState('')

  const handledChange = (e) => {
    setNewExp({...newExp,[e.target.name] : e.target.value})
   // 
    //console.log(newExp)
  }
  const selectVille = (e) => {
    newExp.gov=e.target.value
    dispatch(villeGet({"nom" : e.target.value}))
    // console.log("ville",ville)
  } 

  const saveExp = () =>{
    
    if(pwd===newExp.password)
    {   

        // await setNewExp({...newExp , "numero" : setup.expediteurInd})
          newExp.numero=setup.expediteurInd
          

        dispatch(expAdd(newExp))
        setNewExp({numero : "" , name : "" , telephone :"" ,prixLivraison : 0 , prixRetour : 0, rib:"" , banque : "" , adresse :"" ,codeTVA : "" , email :"" , login: "" , commentaire :"" , gov : "" , ville : ""})
        setPwd('')

      }
    else{
      toast.error('merci de verifier password et confirmation')
    }
    //  console.log(setup.expediteurInd)

  }



      useEffect(()=> {
      dispatch(expGet())
      dispatch(setupGet())
      dispatch(govGet())
    },[] )

    const onAfterSaveCell=(oldValue,newValue,row,column)=> {
      const exp ={}
      const col = column.dataField
      //exp={...exp, col : parseInt(newValue)}
      dispatch(updateExp(row.numero,row))

      // console.log(oldValue,newValue,row,column)
      // console.log("test valeur",column.dataField)
    }

    const columns=[
      {dataField :"numero", text:"Numero", sort : true },
      {dataField :"name", text:"Boutique" , sort : true , filter: textFilter()},
      {dataField :"telephone", text:"Telephone" , sort : true},
      {dataField :"prixLivraison", text:"Prix Livraison" , sort : true , 
        validator:(newValue,row,column)=> {
          if(isNaN(newValue))
          {
            return {
              valid:false,
              message : "please enter a numeric value"
            }
          }
          return true
        }
      },
      {dataField :"prixRetour", text:"Prix Retour" , sort : true},
      {dataField :"rib", text:"Rib" , sort : true},
      {dataField :"banque", text:"Banque" , sort : true},
      {dataField :"adresse", text:"adresse" , sort : true},
      {dataField :"codeTVA", text:"Code TVA" ,sort : true},
      {dataField :"email", text:"Email" , sort : true },
      {dataField :"login", text:"Login" , sort : true , editable : false},
      {dataField :"commentaire", text:"Commentaire" , sort : true},
      {dataField :"gov", text:"Governorat" , sort : true},
      {dataField :"ville", text:"Ville" , sort : true},
      {dataField :"bloquer", text:"Bloquer" , sort : true , 
      formatter : (cellContent, row) => {
        return (
          <div>
            <label>
              <input type="checkbox" checked={row.bloquer} />
            </label>
          </div>
        );
      }
      },

    
    ]
  return (
    <div>
        <>
      <Button variant="primary" onClick={handleShow}>
        Ajouter Expediteur
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Expediteur</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={newExp.name} placeholder="Enter name" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Telephone</Form.Label>
              <Form.Control type="text" name="telephone" value={newExp.telephone} placeholder="Enter telephone" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Prix Livraison</Form.Label>
              <Form.Control type="text" name="prixLivraison" value={newExp.prixLivraison} placeholder="Enter Prix Livraison" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Prix Retour</Form.Label>
              <Form.Control type="text" name="prixRetour" value={newExp.prixRetour} placeholder="Enter Prix retour" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Banque</Form.Label>
              <Form.Control type="text" name="banque" value={newExp.banque} placeholder="Enter Banque" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Adresse</Form.Label>
              <Form.Control type="text" name="adresse" value={newExp.adresse} placeholder="Enter Adresse" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Code TVA</Form.Label>
              <Form.Control type="text" name="codeTVA" value={newExp.codeTVA} placeholder="Enter code TVA" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail" >
              <Form.Label>Email</Form.Label>
              <Form.Control type="text"  name="email" value={newExp.email} placeholder="Enter Email" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Login</Form.Label>
              <Form.Control type="text" name="login" value={newExp.login} placeholder="Enter Login" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={newExp.password} placeholder="Enter Password" onChange={(e)=> handledChange(e)}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control type="password" name="pwd" value={pwd} placeholder="Enter Password" onChange={(e)=> setPwd(e.target.value)}/>
            </Form.Group>


            <Form.Group className="mb-3" >
              <Form.Label>Commetaire</Form.Label>
              <Form.Control type="text" name="commentaire" value={newExp.commentaire} placeholder="Enter commentaire" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Gouvernorat</Form.Label>

                <Form.Select aria-label="Default select example" onChange={(e)=>selectVille(e)}>
                <option>Merci de selectionner un gouvernorat</option>
                  { (Array.isArray(gov)) ? gov.map((e)=> <option key={e.nom} value={e.nom}>{e.nom}</option> ) : <option>merci de selectionner un gov</option> 
                  }
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Ville</Form.Label>

               <Form.Select aria-label="Default select example">
                <option>Merci de selectionner une ville</option>
                  { (Array.isArray(ville)) ? ville.map((e)=> <option>{e}</option> ) : <option>Merci de selectionner une Ville</option> 
                  }
                </Form.Select>
            </Form.Group> 
                        


  <Button variant="primary" onClick={()=>{saveExp();handleClose()}}>
    Submit
  </Button>
</Form>





        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>

        <BootstrapTable 
          keyField="numero" 
          data={exp} 
          columns={columns} 
          striped 
          hover 
          condensed 
          pagination={paginationFactory()}
          cellEdit={cellEditFactory({mode : "dbclick" ,blurToSave:true, afterSaveCell : onAfterSaveCell  })}
          filter={filterFactory()}
          
        />


    </div>
  )
}

export default Expediteur