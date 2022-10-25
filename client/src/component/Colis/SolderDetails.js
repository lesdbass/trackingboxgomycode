import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom';
import { soldeeGetOne } from '../../JS/actions/SoldeeAction'
import {expGetOne} from '../../JS/actions/expediteurAction'
import QRCode from "react-qr-code";
import { Table } from 'react-bootstrap';


const SolderDetails = () => {
    const dispatch=useDispatch()

    let params = useParams(); 
    const numero=params.numero
    const soldee=useSelector((state)=> state.soldeeReducer.soldee)
    const exp =  useSelector((state)=> state.expReducer.oneExp)

    const formatDate=(d) => {
        const dt = new Date(d)
        return dt.toLocaleDateString('fr-FR')

    }

    function toPrint() {
        window.print();
    }


    useEffect(()=> {
        dispatch(soldeeGetOne(numero))
        console.log(soldee.boutique)
        dispatch(expGetOne(soldee.boutique))
        // dispatch(expGetOne(colis.boutique))
    },[])


  return (
   <>
            <center>
                <button class="btn btn-primary hidden-print" onClick={()=>toPrint()}> <span class="glyphicon glyphicon-print" aria-hidden="true">Print</span></button>
	         </center>


        <div style={{ display : "flex" , justifyContent: "space-around" , alignItems :"Center"}}>
            <div>
            <QRCode value={numero} level="L" size="100" />
            <h3>{numero}</h3>
            </div>
            <div> 
                <b>EXPEDITEUR : </b> {exp.name} <br/>
                <b>ADRESSE :</b> {exp.adresse} {exp.gouvernorat}  {exp.ville} <br/> 
                <b>TELEPHONE : </b> {exp.telephone} {exp.telephone2} <br/> 
                <b>Code TVA :</b> {exp.codeTVA}  
            </div>
        </div>

        <div>
        <h2>BON DE Paiement : {numero} </h2>   
      </div> 

      <div style={{ display : "flex" , justifyContent: "space-around" , alignItems :"Center"}}>
            <div>
                <b>Date : </b> {formatDate(soldee.date)}
            </div>
            <div>
                <b>Total : </b> {soldee.total} <br />
                <b>Frais de Trans : </b> {soldee.fraisTransport}<br />
                {/* <b>A Payer </b> {(soldee.total-soldee.fraisTransport).toFixed(3)} <br /> */}
            </div>
    </div>


    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tracking N</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>

      {Array.isArray(soldee.details) ? 
            soldee.details.map((e) => (
                <tr>
                  <td>{e.trakingN}</td>
                  <td>{e.tot}</td>
               </tr>
            ))
        : 
        <tr>
        <td></td>
        <td></td>
     </tr>
        }
        </tbody>
        </Table>


   </>
  )
}

export default SolderDetails