import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";

import { Table } from 'react-bootstrap';
import { runsheetGetOne } from '../../JS/actions/runSheetAction'


const DetailsRunSheet = () => {
    const dispatch=useDispatch()
    let params = useParams(); 
    const idRS=params.idRS
    const rs=useSelector((state)=> state.runsheetReducer.runsheet)
    let tot = 0
    //const exp =  useSelector((state)=> state.expReducer.exp)

    // const formatDate=(d) => {
    //     const dt = new Date(rs.date)
    //     return dt.toLocaleDateString('fr-FR')

    // }

    const caltot =(x) =>{
            tot+=x

    }

    function toPrint() {
        window.print();
    }

    useEffect(()=> {
        dispatch(runsheetGetOne(idRS))


       // dispatch(expGetOne(colis.boutique))

        
    },[])
  return (
    <>
             <center>
                <button class="btn btn-primary hidden-print" onClick={()=>toPrint()}> <span class="glyphicon glyphicon-print" aria-hidden="true">Print</span></button>
	         </center>

    
        <div style={{ display : "flex" , justifyContent: "space-around" , alignItems :"Center"}}>
            <div>
            <QRCode value={idRS} level="L" size="100" />
            <h3>{idRS}</h3>
            </div>
            <div> 
                <b>Chauffeur : </b> {rs.nom} <br/>
                <b>Matricule :</b> {rs.matricule} <br/> 
                <b>date : </b> {rs.date} <br/>  
            </div>
        </div>
        <br/>
    <div>
        <h2>RunSheet : {idRS} </h2>   
    </div> 

    <div style={{ display : "flex" , justifyContent: "space-around" , alignItems :"Center"}}>
            <div>
                <b>Date : </b> {rs.date}
            </div>
    </div>



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
            rs.details.map((e) => ( caltot(e.total),
                <tr>
                  <td>{e.trakingN}</td>
                  <td>{e.nom}</td>
                  <td>{e.adresse}</td>
                  <td>{e.telephone}</td>
                  <td>{e.total} </td>
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
        

       {
        <tr>
            <td colSpan={3} ><b>Total</b></td>
            <td colSpan={3}><b>{(tot)} DT</b></td>
        </tr> }

        </tbody>
        </Table>

        {/* <div>
            <h1>{colis.ville} / {colis.gouvernorat} </h1>
        </div> */}
        
     </>
    
  )
}

export default DetailsRunSheet
