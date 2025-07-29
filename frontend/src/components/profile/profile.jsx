import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/user.jsx';
import { useInfoStore } from '../../store/info.ts';
import './profile.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import EntityTable from '../entityTable/EntityTable.jsx';

function Profile() {
  const [ message, setMessage ] = useState();
  const navigate = useNavigate();
  const { checkAccess } = useUserStore();
  const [ entity, setEntity ] = useState({
    name: '',
    state: 'Entity state',
    dueDate: '',
    status: 'Status',
    notes: '',
    userReference: ''
  })
  const [ entityIndex, setEntityIndex ] = useState();
  const [ show, setShow ] = useState(false);
  const [ edit, setEdit ] = useState(false);
  const [ deleteEntity, setDeleteEntity ] = useState(false);

  useEffect(() => {
    async function checkingTokenAccess() {
      /*console.log('is this triggering upon refreshing page?');*/
      const res = await checkAccess();
      /*console.log(res);*/
      if (!res.valid) {
        navigate('/')
      }
    }
    checkingTokenAccess();
  })

  const handleEditEntity = (newEntity) => {
    setEntity({...entity, newEntity})
  }
  //const signOut = useSignOut();
  //const navigate = useNavigate();

  //GET RID of this in the future as it is not secure, but is useful when deleting the user for the time being.
  const location = useLocation();
  const id = location.state.id;
  const user = location.state.data;
  /*console.log(id)
  
  console.log(user);*/

  //console.log(JSON.parse(localStorage.getItem('user')));

  /*const logout = () => {
    navigate...
  }*/

  // When have a logout button use logout function

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { createEntity, updateEntity } = useUserStore();
  const updateEntities = useInfoStore(state => state.updateEntities);


  const handleEntityAction = async () => {
    
    setEntity({...entity, userReference: entity.name + ' ' + entity.state + ' ' + entity.dueDate})

    console.log(entity);
    if (!edit) {
      const updatedContent = await createEntity(entity);
      updateEntities(updatedContent.data.entities);
      
      
      console.log(updatedContent);

      /*window.location.reload();*/
    } else {
      
      const updatedContent = await updateEntity(entity, entityIndex);
      updateEntities(updatedContent.data.entities);
      setEdit(false);

      /*window.location.reload()*/
    }
  }

  return(
    <>
      <p>{user.businessName}</p>
      <p>{id}</p>
      <p>{message}</p>
      <Button onClick={() => handleShow()}> Create Entity</Button>
      <EntityTable handleShow={handleShow} setEntity={setEntity} setEdit={setEdit} setDelete={setDeleteEntity} setEntityIndex={setEntityIndex}/>

      
      <Button> Update Entity</Button>
      <Button> Delete Entity</Button>
      <Modal show={show}  onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Create new entity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Entity name</Form.Label>
              <Form.Control
                type="name"
                value={entity.name}
                onChange={e => setEntity({ ...entity, name: e.target.value })}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Dropdown onSelect={e => setEntity({...entity, state: e})} rows={3} value={entity.state}
               >
                <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
                  {entity.state}
                </Dropdown.Toggle>

                <Dropdown.Menu className='scrollable-dropdown-menu'>
                  <Dropdown.Item eventKey='Alabama'>
                    Alabama
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Alaska'>
                    Alaska
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Arizona'>
                    Arizona
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Arkansas'>
                    Arkansas
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='California'>
                    California
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Colorado'>
                    Colorado
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Connecticut'>
                    Connecticut
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Delaware'>
                    Delaware
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='District of Columbia'>
                    District of Columbia
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Florida'>
                    Florida
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Georgia'>
                    Georgia
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Hawaii'>
                    Hawaii
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Idaho'>
                    Idaho
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Illinois'>
                    Illinois
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Indiana'>
                    Indiana
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Iowa'>
                    Iowa
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Kansas'>
                    Kansas
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Kentucky'>
                    Kentucky
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Louisiana'>
                    Louisiana
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Maine'>
                    Maine
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Maryland'>
                    Maryland
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Massachusetts'>
                    Massachusetts
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Michigan'>
                    Michigan
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Minnesota'>
                    Minnesota
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Mississippi'>
                    Mississippi
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Missouri'>
                    Missouri
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Montana'>
                    Montana
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Nebraska'>
                    Nebraska
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Nevada'>
                    Nevada
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='New Hampshire'>
                    New Hampshire
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='New Jersey'>
                    New Jersey
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='New Mexico'>
                    New Mexico
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='New York'>
                    New York
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='North Carolina'>
                    North Carolina
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='North Dakota'>
                    North Dakota
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Ohio'>
                    Ohio
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Oklahoma'>
                    Oklahoma
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Oregon'>
                    Oregon
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Pennsylvania'>
                    Pennsylvania
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Rhode Island'>
                    Rhode Island
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='South Carolina'>
                    South Carolina
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='South Dakota'>
                    South Dakota
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Tennessee'>
                    Tennessee
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Texas'>
                    Texas
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Utah'>
                    Utah
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Vermont'>
                    Vermont
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Virginia'>
                    Virginia
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Washington'>
                    Washington
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='West Virginia'>
                    West Virginia
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Wisconsin'>
                    Wisconsin
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Wyoming'>
                    Wyoming
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Due date</Form.Label>
              <Form.Control as="textarea" rows={1} placeholder='month date, year (i.e. March 21, 2026)' value={entity.dueDate}
              onChange={e => setEntity({ ...entity, dueDate: e.target.value})} />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Dropdown onSelect={e => setEntity({...entity, status: e})} value={entity.status}
              >
                <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
                  {entity.status}
                </Dropdown.Toggle>

                <Dropdown.Menu className='scrollable-dropdown-menu'>
                  <Dropdown.Item eventKey='Active'>
                    Active
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Inactive'>
                    Inactive
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Pending'>
                    Pending
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Good Standing'>
                    Good Standing
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Not in Good Standing'>
                    Not in Good Standing
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Dissolved'>
                    Dissolved
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Suspended'>
                    Suspended
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Revoked'>
                    Revoked
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} value={entity.notes}
              onChange={e => setEntity({ ...entity, notes: e.target.value})} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {handleClose(); handleEntityAction()}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default Profile