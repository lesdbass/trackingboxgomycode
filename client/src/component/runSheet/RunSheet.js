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
import {runsheetGet,runsheetAdd,runsheetGetOne} from '../../JS/actions/runSheetAction'
import {colisGet,updateColis} from '../../JS/actions/ColisAction'



const RunSheet = () => {
    const dispatch=useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const rs=useSelector((state)=> state.runsheetReducer.runsheet)
  
    useEffect(()=> {
        dispatch(runsheetGet())
        // dispatch(govGet())
        // dispatch(expGetOne(global.boutiqueName))
    
      },[])





      const columns=[
        {dataField :"idRS", text:"ID N°", sort : true ,editable : false, filter: textFilter() },
        {dataField :"numero", text:"numero" , sort : true , filter: textFilter()},
        {dataField :"nom", text:"nom" , sort : true , filter: textFilter()},
        {dataField :"matricule", text:"matricule" , sort : true , filter: textFilter()},
        {dataField :"date", text:"date" , sort : true , filter: textFilter(), editable : false },
        
       {dataField :"details", text:"Details" , editable : false , 
        formatter : (cellContent, row) => {
          return (
            <div>
               <Link to={`/runsheetOne/${row.idRS}`} > <Button variant="primary" >Details</Button> </Link> 
    
              
            </div>
          )
        }
    
       }
        
    
      
      ]

  return (




    <div>
           <div>
               <Link to={"/newrunsheet/"} > <Button variant="primary" >Ajouter</Button> </Link> 
    
            </div>

          <BootstrapTable 
          keyField="idRS" 
          data={rs} 
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


export default RunSheet