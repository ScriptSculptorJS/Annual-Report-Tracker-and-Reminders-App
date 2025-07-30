import { useInfoStore } from '../../store/info.ts';
import { useUserStore } from '../../store/user.jsx';
import './entityTable.css';

function EntityTable({ handleShow, setEntity, setEdit, setEntityIndex, entity }) {

  const newEntitiesArray = [];
  //Collects variables and methods to use later
  const { entities, updateEntities } = useInfoStore();
  const { deleteEntity } = useUserStore();

  //Interates through the entities array and creates HTML for each entity with specific styling based on its status
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const status = entity.status;
    let statusColor;

    const dateFromMongo = new Date(entity.dueDate);
    const formattedDate = dateFromMongo.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    if (status === 'Active') {
      statusColor = 'green'
    } else if (status === 'Good Standing') {
      statusColor = 'brightGreen'
    } else if (status === 'Pending') {
      statusColor = 'amberYellow'
    } else if (status === 'Not in Good Standing') {
      statusColor = 'orange'
    } else if (status === 'Suspended') {
      statusColor = 'redOrange'
    } else if (status === 'Revoked') {
      statusColor = 'red'
    } else if (status === 'Dissolved') {
      statusColor = 'gray'
    } else if (status === 'Inactive') {
      statusColor = 'lightGray'
    }

    newEntitiesArray.push(
          <tr key={i}>
            <th scope="row" className='fw-normal'>{entity.name}</th>
            <td>{entity.state}</td>
            <td>{formattedDate}</td>
            <td className={statusColor}>{status}</td>
            <td>{entity.notes}</td>
            <td className='options' onClick={() => handleShowList(i)}>
              &#8942;
              <div className='entityOptions hidden' id={i}>
                <ul>
                  <li onClick={() => {
                    handleShow(); 
                    setEdit(true); 
                    setEntityIndex(i); 
                    setEntity({...entity, name: entity.name, state: entity.state, dueDate: formattedDate, status: entity.status, notes: entity.notes});
                  }}>
                    Edit
                  </li>
                  <li className='delete' onClick={() => {deleteEntityObject(entity._id);}}>
                    Delete
                  </li>
                </ul>
              </div>
            </td>
          </tr>
    )
  }

  //Checks if entities array is empty and renders message to user that they do not have entities, or renders a table consisting of their entities
  const handleShowList = (i) => {
    const listContainerElement = document.getElementsByClassName('entityOptions')[i];
    const optionsLinkElement = document.getElementsByClassName('options')[i];

    if (listContainerElement.classList.contains('hidden')) {
      
      listContainerElement.classList.remove('hidden');

      //Add an event listener to see if the user clicks outside of the ellipsis or dropdown menu to edit or delete and hides the dropdown
      document.addEventListener('click', e => {
        if (e.target !== listContainerElement && e.target !== optionsLinkElement) {
          listContainerElement.classList.add('hidden');
        }
      })

    } else {
      listContainerElement.classList.add('hidden');
    }
  }

  //Deletes entity from database and updates entities in the info store
  const deleteEntityObject = async (entityId) => {
    const updatedContent = await deleteEntity(entityId);

    if (!updatedContent.data) {

      alert(`
        Status: ${updatedContent.status}
        Message: "${updatedContent.message}"
      `)

    } else {

      updateEntities(updatedContent.data.entities);
      setEntity({...entity, name: '', state: 'Entity state', dueDate: '', status: 'Status', notes: ''})

    }

    
  }

  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">State</th>
          <th scope="col">Due Date</th>
          <th scope="col">Status</th>
          <th scope="col">Notes</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {newEntitiesArray}
      </tbody>
    </table>
  )
}

export default EntityTable;