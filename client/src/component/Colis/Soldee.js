import React, {useEffect,useState} from 'react'
import { expGet,expGetOne } from '../../JS/actions/expediteurAction'
import {colisGetLivree , showLoading,hideLoading,updateColis} from '../../JS/actions/ColisAction'
import {soldeeGet,soldeeAdd} from '../../JS/actions/SoldeeAction'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory  from 'react-bootstrap-table2-editor'
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter'
import {Button,Modal,Form,Table, Toast} from 'react-bootstrap'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// import {DatePicker,ControlLabel,HelpBlock} from 'react-bootstrap-date-picker'

const Soldee = () => {

  const dispatch=useDispatch()
  const [boutique, setBoutique] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const exp = useSelector((state) =>state.expReducer.exp)
  const expOne =useSelector((state)=> state.expReducer.oneExp)
  const soldee =useSelector((state) => state.soldeeReducer.soldee)
  const colis = useSelector((state) => state.colisReducer.colis)
  const loading =useSelector((state) => state.colisReducer.loading)

  var totalSolde = 0
  var totalFrais = 0
  var x=0 

  useEffect(()=> {
    
    dispatch(expGet())
    dispatch(soldeeGet())
    
    //console.log(soldee)

  },[])


  const columns=[
      {dataField :"numero", text:"Numero", sort : true },
    {dataField :"date", text:"Date" , sort : true , filter: textFilter()},
    {dataField :"boutique", text:"Boutique" , sort : true , filter: textFilter()},
    {dataField :"commentaire", text:"Commentaire" , sort : true},
    {dataField :"total", text:"Total" , sort : true},
    {dataField :"fraisTransport", text:"fraisTransport" , sort : true},
    {dataField :"details", text:"Details" , editable : false , 
    formatter : (cellContent, row) => {
      return (
        <div>
           <Link to={`/SolderD/${row.numero}`} > <Button variant="primary" >Details</Button> </Link> 

          
        </div>
      )
    }

   }
  
  ]

  const SaveSoldee = () => {
    let sol ={
      numero : uuidv4() ,
      boutique : expOne.name ,
      total : totalSolde.toFixed(3),
      fraisTransport : totalFrais.toFixed(3),
      details : []
    }

      for(var i= 0; i < colis.length; i++)
      {
        let x= {trakingN: colis[i].trakingN , tot : colis[i].total.toFixed(3)}
        sol.details.push(x)

      }
        dispatch(soldeeAdd(sol))
        dispatch(soldeeGet())
        for(i= 0; i < colis.length; i++)
        {
          
            dispatch(updateColis(colis[i].trakingN,{soldee:true , status : "Encaisser"}           ))
        }

        handleClose()
  }
  
  


  const CalculSolde=(e) => {
    if(e.echange===true)
    { totalFrais=totalFrais+expOne.prixRetour
      x=expOne.prixRetour
    }
    else
    {
      totalFrais=totalFrais+expOne.prixLivraison
      x=expOne.prixLivraison 
    }    
                   totalSolde=totalSolde+(e.total-x) 
  }

const selectColis=(e)=> {

      dispatch(expGetOne(e.target.value))

      dispatch(showLoading())
      dispatch(colisGetLivree(e.target.value))
      dispatch(hideLoading())

      // for(var i= 0; i < colis.length; i++)
      // {
      //   if(colis[i].echange===true)
      //   {
      //     totalFrais=totalFrais+expOne.prixRetour
      //   }
      //   else 
      //   {
      //     totalFrais=totalFrais+expOne.prixLivraison
      //   }

      // }
      // console.log(totalFrais,totalSolde)


}

  return (
    <div>

        <Button variant="primary" onClick={handleShow}>
             Ajouter Soldee
        </Button>

      <div style={{width : "1000px !important"}}>
        

        <Modal show={show} onHide={handleClose} style={{width : "1000px !important"}}>
            <Modal.Header closeButton>
              <Modal.Title>Ajouter Soldee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <Form>
                  <div>
                  <Form.Group className="mb-3" >
                <Form.Label>Boutique</Form.Label>

                <Form.Select aria-label="Default select example" value={boutique} onChange={e =>  {setBoutique(e.target.value);selectColis(e)}}>
                {/* <Form.Select aria-label="Default select example" onChange={(e)=>handledChangeStatus(e)}> */}

                <option>Merci de selectionner un Boutique</option>
                  { (Array.isArray(exp)) ? exp.map((e)=> <option key={e.name} value={e.name}   >{e.name}</option> ) : <option>merci de selectionner un Boutique</option> 
                  }
                </Form.Select>
                </Form.Group>
            </div>

    

                  </Form>
            </Modal.Body>
            <Table striped bordered hover>
                  <thead>
                      <tr>
                         <th>Tracking N</th>
                         <th>Commentaire</th>
                         <th>Total Colis</th>
                         <th>Frais Transport</th>
                         <th>Frais Colis</th>
                      </tr>
                  </thead>
                  <tbody>
            {(!loading && expOne.name !=null) ? (Array.isArray(colis) ? 
            colis.map((e)=> 

            <>
                {CalculSolde(e)}
              <tr>
                <td>{e.trakingN}</td>
                <td>{`${e.nom} / ${e.gouvernorat} / ${e.telephone}`}</td>
                <td>{e.total.toFixed(3)}</td>
                <td>{(e.echange===true) ? expOne.prixRetour.toFixed(3) : expOne.prixLivraison.toFixed(3) }</td>
                <td>{(e.total-x).toFixed(3)}</td>
            </tr>
           </>
            )
            : "") : ""}
            </tbody>
            <tr>
                <td colSpan={3}>Total Frais</td>
                <td colSpan={2}>{totalFrais.toFixed(3)}</td>
            </tr>

            <tr>
            <td colSpan={3}>Total Soldee</td>
                <td colSpan={2}>{totalSolde.toFixed(3)}</td>
            </tr>
          </Table>   
          <Button variant="success" onClick={SaveSoldee}>
             Enregistre
          </Button>

        </Modal>
        </div>

            


            <BootstrapTable 
          keyField="numero" 
          data={soldee} 
          columns={columns} 
          striped 
          hover 
          condensed 
          pagination={paginationFactory()}
          filter={filterFactory()}
          
        />





    </div>
  )
  
}

export default Soldee