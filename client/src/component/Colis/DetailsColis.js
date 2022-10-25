import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";

import { Table } from 'react-bootstrap';
import { colisGetOne } from '../../JS/actions/ColisAction'
import {expGetOne} from '../../JS/actions/expediteurAction'


const DetailsColis = () => {
    const dispatch=useDispatch()

    let params = useParams(); 
    const trakingN=params.trakingN
    const colis=useSelector((state)=> state.colisReducer.colisOne)
    const exp =  useSelector((state)=> state.expReducer.oneExp)

    const formatDate=(d) => {
        const dt = new Date(colis.date)
        return dt.toLocaleDateString('fr-FR')

    }

    function toPrint() {
        window.print();
    }

    useEffect(()=> {
        dispatch(colisGetOne(trakingN))


        dispatch(expGetOne(colis.boutique))

        
    },[])
  return (
    <>
             <center>
                <button class="btn btn-primary hidden-print" onClick={()=>toPrint()}> <span class="glyphicon glyphicon-print" aria-hidden="true">Print</span></button>
	         </center>

    
        <div style={{ display : "flex" , justifyContent: "space-around" , alignItems :"Center"}}>
            <div>
            <QRCode value={trakingN} level="L" size="100" />
            <h3>{trakingN}</h3>
            </div>
            <div> 
                <b>EXPEDITEUR : </b> {exp.name} <br/>
                <b>ADRESSE :</b> {exp.adresse} {exp.gouvernorat}  {exp.ville} <br/> 
                <b>TELEPHONE : </b> {exp.telephone} {exp.telephone2} <br/> 
                <b>Code TVA :</b> {exp.codeTVA}  
            </div>
        </div>
        <br/>
    <div>
        <h2>BON DE LIVRAISON : {trakingN} </h2>   
    </div> 

    <div style={{ display : "flex" , justifyContent: "space-around" , alignItems :"Center"}}>
            <div>
                <b>Date : </b> {formatDate(colis.date)}
            </div>
            <div>
                <b>Nom Destinataire : </b> {colis.nom} <br />
                <b>Adresse : </b> {colis.adresse} {colis.gouvernorat} {colis.ville} <br />
                <b>Telephone </b> {colis.telephone} {colis.telephone2} <br />
            </div>
    </div>



    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Prix Unitaire</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        
      {Array.isArray(colis.details) ? 
            colis.details.map((e) => (
                <tr>
                  <td>{e.description}</td>
                  <td>{e.qty}</td>
                  <td>{e.prix}</td>
                  <td>{e.tot}</td>
               </tr>
            ))
        : 
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
     </tr>
        }
        <tr>
            <td colSpan={2} >Montant HT</td>
            <td colSpan={2}>{(colis.total/1.19).toFixed(3)} DT</td>
        </tr>

        <tr>
            <td colSpan={2} >TVA 19%</td>
            <td colSpan={2}>{(colis.total-((colis.total/1.19).toFixed(3))).toFixed(3)} DT</td>
        </tr>
        <tr>
            <td colSpan={2} ><b>Total</b></td>
            <td colSpan={2}><b>{(colis.total)} DT</b></td>
        </tr>

        </tbody>
        </Table>

        <div>
            <h1>{colis.ville} / {colis.gouvernorat} </h1>
        </div>
        
     </>
    
  )
}

export default DetailsColis
