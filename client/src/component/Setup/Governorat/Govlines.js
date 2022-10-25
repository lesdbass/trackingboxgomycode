import React, {useState} from 'react'
import { govDelete, govGet } from '../../../JS/actions/govAction'
import {useDispatch} from 'react-redux'
import {Button,Modal} from 'react-bootstrap'
import GetVille from './GetVille'
const Govlines = ({gov}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const {nom,racine}=gov
    const ville=""
  return (
    <tr>
      <td>{racine}</td>
      <td>{nom}</td>
      <td>
        {/* <Button variant="primary">Ville</Button> */}

        <Button variant="primary" onClick={handleShow}>
              Ville ({gov.ville.length})
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{nom}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <GetVille nom={nom} key={racine} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>






      </td>
      <td><Button variant="danger" onClick={() => dispatch(govDelete({nom,ville}))}>Supprimer</Button></td>
    </tr> 
)
}


export default Govlines