import React ,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form,InputGroup,Button,Modal,Table} from 'react-bootstrap'
import {setupUpdate,addStatus,setupGet,setupDelStatus} from '../../../JS/actions/setupAction'
import { BsFillBadgeAdFill,BsTelephoneFill } from 'react-icons/bs';
import { TbReceiptTax} from 'react-icons/tb';
import {MdEmail,MdSendToMobile, MdSettingsInputComponent} from 'react-icons/md';
import {AiFillCar,AiFillControl} from 'react-icons/ai';

const UpdateSetup = () => {

    const dispatch=useDispatch()
  
    useEffect(()=> {
      
      dispatch(setupGet())

      //  setCompany(setup.company)

      // console.log(company)
   },[])

    const setup = useSelector((state) => state.setupReducer.setup )
    const [company,setCompany]=useState(useSelector((state) => state.setupReducer.setup.company ))
    const [loading,setLoading] = useState(useSelector(state => state.setupReducer.loading))
    const [year,setYear]=useState(setup.year)
    const [expediteurInd,setExpiditeurInd] =useState(setup.expediteurInd)
    const [livreurInd,setLivreurInd] = useState(setup.livreurInd)

  


    // const [tbStatusColis, setTbStatusColis]=useState(setup.statuColis)
    // const [tbMotifRetour, setTbMotifRetour]=useState(setup.motifRetour)
    // const [tbMotifDepense, setTbMotifDepense]=useState(setup.motifDepense)

    const [showStatus, setShowStatus] = useState(false);
    const handleCloseStatus = () => setShowStatus(false);
    const handleShowStatus = () => setShowStatus(true);

    const [showMRetour, setShowMRetour] = useState(false);
    const handleCloseMRetour = () => setShowMRetour(false);
    const handleShowMRetour = () => setShowMRetour(true);

    const [showMDepense, setShowMDepense] = useState(false);
    const handleCloseMDepense = () => setShowMDepense(false);
    const handleShowMDepense = () => setShowMDepense(true);


    const [statusC,setStatusC]=useState({code :'' , name: ''})
    const [motifRetour,setMotifRetour]=useState({code :'' , name: ''})
    const [motifDepense,setMotifDepense]=useState({code :'' , name: ''})
    
  
 
    

    const handledStatus = (e) => {
      // e.preventDefault()     
      setStatusC({...statusC,[e.target.name] : e.target.value})
     // console.log(statusC)
    }
    const handledMRetour = (e) => {
      // e.preventDefault()     
      setMotifRetour({...motifRetour,[e.target.name] : e.target.value})
     // console.log(statusC)
    }
    const handledMotifDepense = (e) => {
      // e.preventDefault()     
      setMotifDepense({...motifDepense,[e.target.name] : e.target.value})
     // console.log(statusC)
    }


    const saveStatus= ()=> {
      const statusColis = statusC
      dispatch(addStatus({...setup , statusColis,motifRetour:'',motifDepense:''}))
      setStatusC({code : "" , name :""})
    }

    
    const saveMotifRetour= ()=> {
      
      dispatch(addStatus({...setup , statusColis : '',motifRetour,motifDepense:''}))
      setMotifRetour({code : "" , name :""})
    }
    
    const saveMotifDepense= ()=> {
      dispatch(addStatus({...setup , statusColis:'',motifRetour:'',motifDepense}))
      setMotifDepense({code : "" , name :""})
    }


    const handledCp=(e)=> {
        e.preventDefault();
      // console.log({[e.targer.name]:e.target.value} )
       setCompany({...company , [e.target.name]:e.target.value})
       //  console.log(company)

    }


    const saveCompany=(e)=>{
      setup.company=company
      setup.year=year
      setup.expediteurInd=expediteurInd
      setup.livreurInd=livreurInd
      dispatch(setupUpdate(setup))
    }

  //  (loading ? <></> : setCompany(setup.company) )
 
  if(Object.keys(setup).length > 0  )
{
  //setSetup(setup)
   // setCompany(setupNew.company)
  //  console.log(setup)


  return (
  
    <div style={{marginLeft:"350px"}}>
     {/* { (company) :  */}
    <Form>
      <InputGroup className="mb-3">

       <InputGroup.Text id="basic-addon1">C</InputGroup.Text>
        <Form.Control
           value={setup.company.fullName}
          disabled />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><BsFillBadgeAdFill /></InputGroup.Text>
        <Form.Control
            aria-label="Adresse"
            aria-describedby="basic-addon1"
            name="adresse"
            value={company.adresse}
            onChange={handledCp}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><BsTelephoneFill /></InputGroup.Text>
        <Form.Control
            aria-describedby="basic-addon1"
            name="tel"
            value={company.tel}
            onChange={handledCp}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><TbReceiptTax /></InputGroup.Text>
        <Form.Control
            aria-describedby="basic-addon1"
            name="codeTva"
            value={company.codeTva}
            onChange={handledCp}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><MdEmail /></InputGroup.Text>
        <Form.Control
            aria-describedby="basic-addon1"
            name="email"
            value={company.email}
            onChange={handledCp}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><AiFillControl /></InputGroup.Text>
        <Form.Control
            aria-describedby="basic-addon1"
            name="year"
            value={year}
             onChange={(e)=>setYear(e.target.value)}

        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><MdSendToMobile /></InputGroup.Text>
        <Form.Control
          
            aria-describedby="basic-addon1"
            name="expediteurInd"
            value={expediteurInd}
            onChange={(e)=>setExpiditeurInd(e.target.value)}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><AiFillCar /></InputGroup.Text>
        <Form.Control
            aria-describedby="basic-addon1"
           name="livreurInd"
            value={livreurInd}
            onChange={(e)=>setLivreurInd(e.target.value)}

        />
      </InputGroup>

      {/* debut Status */}

      <InputGroup className="mb-3">
      <Button variant="primary" onClick={handleShowStatus} style={{margin : "10px"}}>
        Status
      </Button>
      <Button variant="warning" onClick={handleShowMRetour} style={{margin : "10px"}}>
         Motif Retour
      </Button>

      <Button variant="info" onClick={handleShowMDepense} style={{margin : "10px"}} >
        Motif Depense
      </Button>

      </InputGroup>

      <Modal show={showStatus} onHide={handledStatus}>
        <Modal.Header closeButton>
          <Modal.Title>status</Modal.Title>
        </Modal.Header>
        <Modal.Body>

                      <div style={{width:"300px", textAlign:"center"}}>
                      <Form>
                          <Form.Group className="mb-3" >
                              <Form.Label>code</Form.Label>
                              <Form.Control type="text" name="code" value={statusC.code} onChange={(e) => handledStatus(e)} placeholder="Entrer code status" />
                          </Form.Group>

                          <Form.Group className="mb-3" >
                              <Form.Label>name</Form.Label>
                              <Form.Control type="text" name="name" value={statusC.name} onChange={(e) =>handledStatus(e)} placeholder="Entrer name status" />
                          </Form.Group>
                        <Button variant="primary" onClick={saveStatus} >
                           {/*  */}
                          Ajouter
                        </Button>
                        
                      </Form>    
                  </div>



              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>code</th>
                    <th>Status</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>


                  {    (setup.statusColis.length > 0) ?  setup.statusColis.map((status)=> <tr key={status.code}><td>{status.code}</td><td>{status.name}</td><td><Button variant="danger" onClick={()=> {dispatch(setupDelStatus({"statusColis" : status.name}))}}>Supprimer</Button></td> </tr> ) : <tr><td></td><td></td> </tr>  }
              

                  
                </tbody>
              </Table>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStatus}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      

      {/* <Button variant="success" style={{margin : "10px"}}>
        Status
      </Button> */}
      {/* <Button variant="warning" style={{margin : "10px"}} >
        Motif Retour
      </Button> */}


      {/* Gestion Motif Retour */}
      {/* <InputGroup className="mb-3"> */}
      
      <Modal show={showMRetour} onHide={handleCloseMRetour}>
          <Modal.Header closeButton>
            <Modal.Title>Motif Retour</Modal.Title>
          </Modal.Header>
        <Modal.Body>

                      <div style={{width:"300px", textAlign:"center"}}>
                      <Form>
                          <Form.Group className="mb-3" >
                              <Form.Label>code</Form.Label>
                              <Form.Control type="text" name="code" value={motifRetour.code} onChange={(e) => handledMRetour(e)} placeholder="Entrer code Motif Retour" />
                          </Form.Group>

                          <Form.Group className="mb-3" >
                              <Form.Label>name</Form.Label>
                              <Form.Control type="text" name="name" value={motifRetour.name} onChange={(e) =>handledMRetour(e)} placeholder="Entrer name Motif Retour" />
                          </Form.Group>
                        <Button variant="primary" onClick={saveMotifRetour} >
                           {/*  */}
                          Ajouter
                        </Button>
                        
                      </Form>    
                  </div>



              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>code</th>
                    <th>Motif</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>


                  {    (setup.motifRetour.length > 0) ?  setup.motifRetour.map((status)=> <tr key={status.code}><td>{status.code}</td><td>{status.name}</td><td><Button variant="danger" onClick={()=> {dispatch(setupDelStatus({"motifRetour" : status.name}))}}>Supprimer</Button></td> </tr> ) : <tr><td></td><td></td> </tr>  }
              

                  
                </tbody>
              </Table>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMRetour}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseMRetour}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>




{/* debut Motif depense  */}

<Modal show={showMDepense} onHide={handleCloseMDepense}>
          <Modal.Header closeButton>
            <Modal.Title>Motif Depense</Modal.Title>
          </Modal.Header>
        <Modal.Body>

                      <div style={{width:"300px", textAlign:"center"}}>
                      <Form>
                          <Form.Group className="mb-3" >
                              <Form.Label>code</Form.Label>
                              <Form.Control type="text" name="code" value={motifDepense.code} onChange={(e) => handledMotifDepense(e)} placeholder="Entrer code Motif Depense" />
                          </Form.Group>

                          <Form.Group className="mb-3" >
                              <Form.Label>name</Form.Label>
                              <Form.Control type="text" name="name" value={motifDepense.name} onChange={(e) =>handledMotifDepense(e)} placeholder="Entrer name Motif Depense" />
                          </Form.Group>
                        <Button variant="primary" onClick={saveMotifDepense} >
                           {/*  */}
                          Ajouter
                        </Button>
                        
                      </Form>    
                  </div>



              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>code</th>
                    <th>Motif</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>


                  {    (setup.motifDepense.length > 0) ?  setup.motifDepense.map((status)=> <tr key={status.code}><td>{status.code}</td><td>{status.name}</td><td><Button variant="danger" onClick={()=> {dispatch(setupDelStatus({"motifDepense" : status.name}))}}>Supprimer</Button></td> </tr> ) : <tr><td></td><td></td> </tr>  }
              

                  
                </tbody>
              </Table>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMDepense}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseMDepense}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>





     







      <Button variant="primary" onClick={saveCompany}>
        Save
      </Button>
    </Form>
 
    </div>
 )
}

}

export default UpdateSetup
