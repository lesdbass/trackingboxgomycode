import React, {useEffect,useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { useSelector,useDispatch } from 'react-redux'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory  from 'react-bootstrap-table2-editor'
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter'
import {Button,Modal,Form} from 'react-bootstrap'
import { toast } from 'react-toastify';

import {livAdd, livGet,updateLiv} from '../../../JS/actions/livreurAction'
import {setupGet} from '../../../JS/actions/setupAction'

const Livreur = () => {

  const dispatch=useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const liv = useSelector((state) =>state.livReducer.liv)
  
  const setup = useSelector((state) => state.setupReducer.setup)

  const [newLiv,setNewLiv] =useState ({numero : "" , nom : "" , telephone :"" ,telephone2 : "" , cin : "", matricule:"" , login: ""})
  const [pwd,setPwd]=useState('')

  const handledChange = (e) => {
    setNewLiv({...newLiv,[e.target.name] : e.target.value})
   // 
    //console.log(newLiv)
  }


  const saveLiv = () =>{
    
    if(pwd===newLiv.password)
    {   

        // await setnewLiv({...newLiv , "numero" : setup.expediteurInd})
          newLiv.numero=setup.livreurInd
        console.log(newLiv)
        dispatch(livAdd(newLiv))
        setNewLiv({numero : "" , nom : "" , telephone :"" ,telephone2 : "" , cin : "", matricule:"" , login: ""})
        setPwd('')

      }
    else{
      toast.error('merci de verifier password et confirmation')
    }
    //  console.log(setup.expediteurInd)

  }



useEffect(()=> {

      dispatch(livGet())
      dispatch(setupGet())
      console.log(liv)
    },[] )

    const onAfterSaveCell=(oldValue,newValue,row,column)=> {
      // const liv ={}
      const col = column.dataField
      //exp={...exp, col : parseInt(newValue)}
      dispatch(updateLiv(row.numero,row))

      // console.log(oldValue,newValue,row,column)
      // console.log("test valeur",column.dataField)
    }

    const columns=[
      {dataField :"numero", text:"Numero", sort : true },
      {dataField :"nom", text:"Nom" , sort : true , filter: textFilter()},
      {dataField :"telephone", text:"Telephone" , sort : true},
      {dataField :"telephone2", text:"Telephone 2" , sort : true},
      {dataField :"cin", text:"CIN" , sort : true },
      {dataField :"matricule", text:"matricule" , sort : true},
      {dataField :"login", text:"Login" , sort : true , editable : false},
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
      }

    
    ]
  return (
    <div>
      
  <>
  
  <Button variant="primary" onClick={handleShow}>
          Ajouter Livreur
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter Livreur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  
          <Form>
              <Form.Group className="mb-3" >
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" name="nom" value={newLiv.nom} placeholder="Enter name" onChange={(e)=> handledChange(e)} />
              </Form.Group>
  
              <Form.Group className="mb-3" >
                <Form.Label>Telephone</Form.Label>
                <Form.Control type="text" name="telephone" value={newLiv.telephone} placeholder="Enter telephone" onChange={(e)=> handledChange(e)} />
              </Form.Group>
  
              <Form.Group className="mb-3" >
                <Form.Label>Tel 2</Form.Label>
                <Form.Control type="text" name="telephone2" value={newLiv.telephone2} placeholder="Enter Telephone 2" onChange={(e)=> handledChange(e)} />
              </Form.Group>
  
              <Form.Group className="mb-3" >
                <Form.Label>CIN</Form.Label>
                <Form.Control type="text" name="cin" value={newLiv.cin} placeholder="Enter cin" onChange={(e)=> handledChange(e)} />
              </Form.Group>
  
              <Form.Group className="mb-3" >
                <Form.Label>Matricule</Form.Label>
                <Form.Control type="text" name="matricule" value={newLiv.matricule} placeholder="Enter Matricule" onChange={(e)=> handledChange(e)} />
              </Form.Group>
  
              <Form.Group className="mb-3" >
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" name="login" value={newLiv.login} placeholder="Enter Login" onChange={(e)=> handledChange(e)} />
              </Form.Group>
  
              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={newLiv.password} placeholder="Enter Password" onChange={(e)=> handledChange(e)}/>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control type="password" name="pwd" value={pwd} placeholder="Enter Password" onChange={(e)=> setPwd(e.target.value)}/>
              </Form.Group>
  
  
                          
  
  
    <Button variant="primary" onClick={()=>{saveLiv()}}>
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
           data={liv} 
          columns={columns} 
          striped 
          hover 
          condensed 
          pagination={paginationFactory()}
          // cellEdit={cellEditFactory({mode : "dbclick" ,blurToSave:true, afterSaveCell : onAfterSaveCell  })}
          filter={filterFactory()}
          
        />


    </div>
  )
}

export default Livreur