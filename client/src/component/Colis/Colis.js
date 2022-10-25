import React, {useEffect,useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { useSelector,useDispatch } from 'react-redux'
import paginationFactory from 'react-bootstrap-table2-paginator'
import cellEditFactory  from 'react-bootstrap-table2-editor'
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter'
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {Button,Modal,Form} from 'react-bootstrap'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import '../GlobalVariable'
import {expGet,expGetOne,updateExp} from '../../JS/actions/expediteurAction'
import {govGet,villeGet} from '../../JS/actions/govAction'
import { colisGet,updateColis,colisAdd,colisDel } from '../../JS/actions/ColisAction'


const Colis = () => {
  const dispatch=useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { SearchBar } = Search;

  const exp = useSelector((state) =>state.expReducer.oneExp)
  const gov=useSelector((state) => state.govReducer.gov)
  const ville=useSelector((state)=> state.govReducer.ville)
  const racine=useSelector((state)=> state.govReducer.racine)
  const colis=useSelector((state)=> state.colisReducer.colis)
  const [newColis, setNewColis] = useState({trakingN:"",nom : "", telephone:"" , telephone2 : "" ,adresse : "", gouvernorat:"" , ville : "" ,boutique : "" , commentaire : "" , echange : false , total : 0 , details : []})
  const [dt ,setDt] =useState({description : "" , qty : 0 , prix : 0 , tot : 0})
  useEffect(()=> {
    dispatch(colisGet())
    dispatch(govGet())
    dispatch(expGetOne(global.boutiqueName))

  },[])

  const deleteColis = (trackingN) => {
    // console.log(trackingN)
    // console.log(trackingN)
        dispatch(colisDel(trackingN))
  }

  const handledChange = (e) => {
    setNewColis({...newColis,[e.target.name] : e.target.value})
   // 
    //console.log(newExp)
  }

  const handledChangeDt = (e) => {
    setDt({...dt,[e.target.name] : e.target.value})
   // 
    //console.log(newExp)
  }

  const selectVille = (e) => {
    newColis.gouvernorat=e.target.value
    dispatch(villeGet({"nom" : e.target.value}))
    // console.log("ville",ville)
  } 

  const saveVille = (e) => {
    newColis.ville=e.target.value

  }


  const onAfterSaveCell=(oldValue,newValue,row,column)=> {
    const cls ={}
    const col = column.dataField
    //cls={...cls, col : newValue}
    dispatch(updateColis(row.trakingN,row))
    dispatch(colisGet())
    
    // console.log(oldValue,newValue,row,column)
    // console.log("test valeur",column.dataField)
  }

  const numberCheck = (num,t) => {

    var ch = num?.toString() || ''

    while(ch.length < t )
    {
      ch="0"+ch
    } 
   return(ch)

  }
  const saveColis = async () =>{
            // let nom = newColis.gouvernorat
              // await dispatch(govGet({nom}))
  if(newColis.details.length > 0 )
          {          
            let tracking=numberCheck(racine,3)
            tracking=tracking+numberCheck(exp.numero,4)+numberCheck(exp.compteur,5)
            newColis.trakingN=tracking
            newColis.boutique=global.boutiqueName
            // newColis.ville=
            dispatch(colisAdd(newColis))
            setNewColis({trakingN:"",nom : "", telephone:"" , telephone2 : "" ,adresse : "", gouvernorat:"" , ville : "" ,boutique : "" , commentaire : "" , echange : false , total : 0 , details : []})
            //     setNewExp({numero : "" , name : "" , telephone :"" ,prixLivraison : 0 , prixRetour : 0, rib:"" , banque : "" , adresse :"" ,codeTVA : "" , email :"" , login: "" , commentaire :"" , gov : "" , ville : ""})
          let e = exp 
          e.compteur = e.compteur+1
            dispatch(updateExp(e.numero,e))
          }
          else
          {
            toast.error("Merci d'ajouter au moins un artcile")
          }
  }

  const saveDetails =() => {
    if(dt.description !== "" && dt.qty > 0)
    {
        dt.tot=dt.qty*dt.prix
        newColis.details.push(dt)
        newColis.total=newColis.total+dt.tot
        // console.log(newColis.details)

        setDt({description : "" , qty : 0 , prix : 0 , tot : 0})
    }
    else{
      toast.error("Description et quantité obligatoire")
    }
  }

  const deldetails=(desc,tot)=>{

    newColis.details=newColis.details.filter((e)=> e.description!==desc)
    newColis.total=newColis.total-tot

    // console.log(newColis.details,newColis.total)
  }


  const columns=[
    {dataField :"trakingN", text:"Tracking N°", sort : true ,editable : false, filter: textFilter() },
    {dataField :"nom", text:"nom" , sort : true , filter: textFilter()},
    {dataField :"date", text:"date" , sort : true , filter: textFilter(), editable : false },
    {dataField :"telephone", text:"Telephone" , sort : true},
    {dataField :"telephone2", text:"Telephone 2" , sort : true},
    {dataField :"adresse", text:"Adresse" , sort : true},
    {dataField :"gouvernorat", text:"Gouvernorat" , sort : true , editable : false , filter: textFilter()},
    {dataField :"ville", text:"Ville" , sort : true , editable : false},
    {dataField :"boutique", text:"Boutique" , sort : true , editable : false },
    {dataField :"commentaire", text:"Commentaire" , sort : true},
    {dataField :"status", text:"status" , sort : true, editable : false},
    {dataField :"total", text:"Total" , sort : true, editable : false},
    {dataField :"echange", text:"Echange" , sort : true , 
    formatter : (cellContent, row) => {
      return (
                   <input type="checkbox" checked={row.echange} />
      )
    }
    },

    {dataField :"soldee", text:"Soldée" , sort : true , 
    formatter : (cellContent, row) => {
      return (
                   <input type="checkbox" checked={row.soldee} />
      )
    }
    },

    {dataField :"supprimer", text:"Supprimer" , editable : false , 
    formatter : (cellContent, row) => {
      return (
        <div>
          {(row.status==="En Attente PickUp") ? <Button variant="danger" onClick={()=>deleteColis(row.trakingN)}>Supprimer</Button> : <></>  } 
          
        </div>
      )
    }

   } ,

   {dataField :"details", text:"Details" , editable : false , 
    formatter : (cellContent, row) => {
      return (
        <div>
           <Link to={`/ColisD/${row.trakingN}`} > <Button variant="primary" >Details</Button> </Link> 

          
        </div>
      )
    }

   }
    

  
  ]


  return (
    <div style={{margin : " 20px 20px 20px 20px"}}>
         <Button variant="primary" onClick={handleShow} style={{marginBottom:"20px"}}>
             Ajouter Colis
        </Button>



        {/* <ToolkitProvider
  keyField="trakingN"
  data={ colis }
  columns={ columns }
  search
>
  {
    props => (
      <div>
        <h3>Search :</h3>
        <SearchBar { ...props.searchProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
        />
      </div>
    )
  }
</ToolkitProvider> */}



    <div style={{width : "800px !important"}}>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Colis</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
          <div Class="d-flex flex-row">
                <div>
                    <Form.Group className="mb-3" >
                    <Form.Label>Nom</Form.Label>
                    <Form.Control style={{marginRight : "20px"}} type="text" name="nom" value={newColis.nom} placeholder="Enter nom" onChange={(e)=> handledChange(e)} />
                    </Form.Group>
                </div>

                <div>
                    <Form.Group className="mb-3" >
                     <Form.Label>Telephone</Form.Label>
                    <Form.Control style={{marginRight : "20px"}} type="text" name="telephone" value={newColis.telephone} placeholder="Enter telephone" onChange={(e)=> handledChange(e)} />
                    </Form.Group>
                </div>
                <div>
                <Form.Group className="mb-3" >
                <Form.Label>Telephone 2</Form.Label>
                <Form.Control style={{marginRight : "20px"}} type="text" name="telephone2" value={newColis.telephone2} placeholder="Enter Telephone 2" onChange={(e)=> handledChange(e)} />
              </Form.Group>
                </div>

          </div>
          
          <div Class="d-flex flex-row">
            <div>
               <Form.Group className="mb-3" >
                <Form.Label>Adresse</Form.Label>
               <Form.Control type="text" name="adresse" value={newColis.adresse} placeholder="Enter Adresse" onChange={(e)=> handledChange(e)} />
               </Form.Group>
            </div>
            <div>
                 <Form.Group className="mb-3" >
                <Form.Label>Gouvernorat</Form.Label>

                <Form.Select aria-label="Default select example" onChange={(e)=>selectVille(e)}>
                <option>Merci de selectionner un gouvernorat</option>
                  { (Array.isArray(gov)) ? gov.map((e)=> <option key={e.nom} value={e.nom}>{e.nom}</option> ) : <option>merci de selectionner un gov</option> 
                  }
                </Form.Select>
                </Form.Group>
            </div>
            <div>
            <Form.Group className="mb-3" >
                <Form.Label>Ville</Form.Label>

               <Form.Select aria-label="Default select example" onChange={(e)=>saveVille(e)}>
                <option>Merci de selectionner une ville</option>
                  { (Array.isArray(ville)) ? ville.map((e)=> <option>{e}</option> ) : <option>Merci de selectionner une Ville</option> 
                  }
                </Form.Select>
            </Form.Group>   
            </div>

          </div>
           
            

            

           

           


            <Form.Group className="mb-3" >
              <Form.Label>commentaire</Form.Label>
              <Form.Control type="text" name="commentaire" value={newColis.commentaire} placeholder="Enter un commentaire" onChange={(e)=> handledChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Echange</Form.Label>
              <Form.Check  type="checkbox" name="echange" value={newColis.echange} onChange={(e)=> handledChange(e)} />
            </Form.Group>
{/*details  */}
            <Form>

            <div Class="d-flex flex-row">
                  <div>
                            <Form.Group className="mb-3" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" value={dt.description} placeholder="Enter Description" onChange={(e)=> handledChangeDt(e)} />
                            </Form.Group>
                  </div>
                  
                  <div>
                        <Form.Group className="mb-3" >
                            <Form.Label>Qty</Form.Label>
                            <Form.Control type="number" name="qty" value={dt.qty} placeholder="Enter Qty" onChange={(e)=> handledChangeDt(e)} />
                            </Form.Group>
                  </div>

                  <div>
                        <Form.Group className="mb-3" >
                            <Form.Label>Prix</Form.Label>
                            <Form.Control type="number" name="prix" value={dt.prix} placeholder="Enter Prix" onChange={(e)=> handledChangeDt(e)} />
                            </Form.Group>
                  </div>
                  <Button variant="primary" onClick={()=>{saveDetails()}}>
                      Ajouter
                  </Button>
            </div>
            </Form>
            {/* details */}
            <div>
                {(newColis.details.length > 0) ? 
                <>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Description</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Prix U</th>
                          <th scope="col">Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {newColis.details.map((e) => 
                          <tr>
                          <td>{e.description}</td>
                          <td>{e.qty}</td>
                          <td>{e.prix}</td>
                          <td>{e.tot}</td>
                          <td><Button variant="danger" onClick={() => deldetails(e.description,e.tot)}>Supprimer</Button></td>
                        </tr>

                        )
                        }
                        



                        <tr>
                          <td><b>Total</b></td>
                          
                          <td>{newColis.total}</td>
                        </tr>
                      </tbody>
                    </table>
                </> 
                
                
                : <></> }
            </div>
              


  <Button variant="primary" onClick={()=>{saveColis();handleClose()}}>
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
   </div>







        <BootstrapTable 
          keyField="trackingN" 
          data={colis} 
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

export default Colis