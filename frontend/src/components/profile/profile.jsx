import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/user.jsx';
import { useInfoStore } from '../../store/info.ts';
import './profile.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EntityTable from '../entityTable/EntityTable.jsx';
import Header from '../header/header.jsx';

function Profile() {
  const [ message, setMessage ] = useState();
  const { checkAccess } = useUserStore();
  const [ entity, setEntity ] = useState({
    name: '',
    state: 'Entity state',
    dueDate: '',
    reminderFrequency: 'Set reminder',
    status: 'Status',
    notes: '',
  })
  const [ entityIndex, setEntityIndex ] = useState();
  const [ show, setShow ] = useState(false);
  const [ edit, setEdit ] = useState(false);
  const [ showAlert, setShowAlert ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState('');

  //Checks that the user has access by checking their tokens stored in the cookies in the backend, if not successful it navigates the user to the login page
  useEffect(() => {
    async function checkingTokenAccess() {
      const res = await checkAccess();
      
      if (!res.valid) {
        navigate('/')
      }
    }

    checkingTokenAccess();

  })

  //const signOut = useSignOut();
  //const navigate = useNavigate();

  //GET RID of this in the future as it is not secure, but is useful when deleting the user for the time being.
  const location = useLocation();
  const navigate = useNavigate();
  //Collects variables and methods from stores
  const { createEntity, updateEntity } = useUserStore();
  const { updateEntities, entities, businessName } = useInfoStore();
  const handleShow = () => setShow(true);
  const listRenderingArray = [];
  /*const id = location.state.id;
  const user = location.state.data;*/
  /*console.log(id)
  
  console.log(user);*/

  //console.log(JSON.parse(localStorage.getItem('user')));

  /*const logout = () => {
    navigate...
  }*/

  // When have a logout button use logout function

  //Checks if the entities array is empty, if it is a message alerts the user, if not then it renders the entities in a table
  if (entities.length === 0) {
    listRenderingArray.push(
      <p key='empty' className='red'>
        You currently do not have any entities saved
      </p>
    ) 
  } else {
    listRenderingArray.push(
      <EntityTable 
        handleShow={handleShow} 
        setEntity={setEntity} 
        setEdit={setEdit} 
        setEntityIndex={setEntityIndex} 
        entity={entity} 
      />
    ) 
  }

  //Closes the modal and resets the entity state
  const handleClose = () => {
    setShow(false);
    setEntity({...entity, name: '', state: 'Entity state', dueDate: '', status: 'Status', notes: ''})
  }

  //Checks if user clicked to edit an entity, if not then creates a new entity, updates the entities in the info store, and resets the entity state. Otherwise, it updates the entity, updates the entities in the info store, sets the edit state back to false, and resets the entities state
  const handleEntityAction = async () => {
    handleLoading();
    console.log(entity.dueDate)

    if (!edit) {
      
      const updatedContent = await createEntity(entity);

      if (!updatedContent.data) {
        handleLoading();
        setShowAlert(true)
        setAlertMessage(updatedContent.message);

      } else {
        handleClose();
        setShowAlert(false);
        updateEntities(updatedContent.data.entities);
        setEntity({...entity, name: '', state: 'Entity state', dueDate: '', status: 'Status', notes: ''})
        handleLoading();
      }

    } else {

      const updatedContent = await updateEntity(entity, entityIndex);

      if (!updatedContent.data) {
        handleLoading();
        setShowAlert(true);
        setAlertMessage(updatedContent.message)
      } else {
        handleClose();
        updateEntities(updatedContent.data.entities);
        setShowAlert(false);
        setEdit(false);
        setEntity({...entity, name: '', state: 'Entity state', dueDate: '', status: 'Status', notes: ''})
        handleLoading();
      }

    }
  }

  const handleLoading = () => {
    const loadingElement = document.querySelector('.loading');

    if (loadingElement.classList.contains('hidden')) {
      loadingElement.classList.remove('hidden');
    } else { 
      loadingElement.classList.add('hidden');
    }
  }

  /*const showAlert = (status, message) => {
    console.log('we are in the show Alert function', status, message)
    
    alertArray.push(
      <p variant='danger'>
        Status: "${status}"
        Message: "${message}"
      </p>
    )
  }*/

  return(
    <>
    <Header name={businessName}/>
      <Card>
        <Card.Header className='header-title'>
          Your Entities
        </Card.Header>
        <Card.Body>
          {listRenderingArray}
          <Button className='float-end' onClick={() => handleShow()}> 
            Create Entity
          </Button>
          <p className='loading green hidden'>
            Loading...
          </p>
        </Card.Body>
      </Card>
      
      <Modal 
        show={show}  
        onHide={() => handleClose()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Your entity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group 
              className="mb-3" 
              controlId="exampleForm.ControlInput1"
            >
              <Row>
                <Col xs={12} sm={8}>
                  <Form.Control
                    type="name"
                    value={entity.name}
                    onChange={e => {setEntity({ ...entity, name: e.target.value })}}
                    placeholder='Entity name'
                    autoFocus
                  />
                </Col>

                <Col sm={3}>
                  <Dropdown 
                    onSelect={e => setEntity({...entity, state: e })} 
                    rows={3} 
                    value={entity.state}
                  >
                    <Dropdown.Toggle 
                      variant='secondary' 
                      id='dropdown-basic'
                    >
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
                </Col>
              </Row>
              
            </Form.Group>
            
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control 
                as="textarea" 
                rows={1} 
                placeholder='Due Date: month date, year (i.e. March 21, 2025)' 
                value={entity.dueDate}
                onChange={e => setEntity({ ...entity, dueDate: e.target.value })} 
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Row>
                <Col xs={3} className='me-4'>
                  <Dropdown 
                    onSelect={e => setEntity({...entity, reminderFrequency: e})} 
                    value={entity.reminderFrequency}
                  >
                    <Dropdown.Toggle 
                      variant='secondary' 
                      id='dropdown-basic'
                    >
                      Set reminder
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='scrollable-dropdown-menu'>
                      <Dropdown.Item eventKey='1 month before Due Date'>
                        1 month before Due Date
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='2 weeks before Due Date'>
                        2 weeks before Due Date
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='1 week before Due Date'>
                        1 week before Due Date
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='On Due Date'>
                        On Due Date
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                <Col xs={3}>
                  <Dropdown 
                    onSelect={e => setEntity({...entity, status: e})} 
                    value={entity.status}
                  >
                    <Dropdown.Toggle 
                      variant='secondary' 
                      id='dropdown-basic'
                    >
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
                </Col>
              </Row>
              

              
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={entity.notes}
                placeholder='Notes'
                onChange={e => setEntity({ ...entity, notes: e.target.value})} 
              />
            </Form.Group>
            {showAlert && <Alert variant='danger'>{alertMessage}</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => handleClose()}
          >
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => { 
              handleEntityAction()
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default Profile