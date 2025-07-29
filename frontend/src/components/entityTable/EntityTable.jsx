import { useInfoStore } from '../../store/info.ts';
import './entityTable.css';

function EntityTable({ handleShow, setEntity, setEdit, setDeleteEntity, setEntityIndex }) {
  //For testing purposes only
  const newEntitiesArray = [];
  const entities = useInfoStore(state => state.entities);
  console.log(entities);
  
  /*console.log(user.user);*/

  /*const testEntityArray = [{
    name: 'STTEPS Tutoring, LLC',
    state: 'Washington',
    dueDate: 'March 21, 2026',
    status: 'Active',
    notes: '',
    userReference: 'STTEPSTutoring, LLC Washington March 21, 2026'
  }, {
    name: 'STTEPS Tutoring, LLC',
    state: 'Oregon',
    dueDate: 'November 05, 2025',
    status: 'Active',
    notes: 'Some random notes',
    userReference: 'STTEPS Tutoring, LLC Oregon November 05, 2026'
  }, {
    name: 'STTEPS Tutoring, LLC',
    state: 'Oregon',
    dueDate: 'November 05, 2025',
    status: 'Inactive',
    notes: 'Some random notes',
    userReference: 'STTEPS Tutoring, LLC Oregon November 05, 2026'
  }, {
    name: 'STTEPS Tutoring, LLC',
    state: 'Oregon',
    dueDate: 'November 05, 2025',
    status: 'Pending',
    notes: 'Some random notes',
    userReference: 'STTEPS Tutoring, LLC Oregon November 05, 2026'
  }, {
    name: 'STTEPS Tutoring, LLC',
    state: 'Oregon',
    dueDate: 'November 05, 2025',
    status: 'Not in Good Standing',
    notes: 'Some random notes',
    userReference: 'STTEPS Tutoring, LLC Oregon November 05, 2026'
  }, {
    name: 'STTEPS Tutoring, LLC',
    state: 'Oregon',
    dueDate: 'November 05, 2025',
    status: 'Dissolved',
    notes: 'Some random notes',
    userReference: 'STTEPS Tutoring, LLC Oregon November 05, 2026'
  }, {
    name: 'STTEPS Tutoring, LLC',
    state: 'Oregon',
    dueDate: 'November 05, 2025',
    status: 'Suspended',
    notes: 'Some random notes',
    userReference: 'STTEPS Tutoring, LLC Oregon November 05, 2026'
  }, {
    name: 'STTEPS Tutoring, LLC',
    state: 'Oregon',
    dueDate: 'November 05, 2025',
    status: 'Revoked',
    notes: 'Some random notes',
    userReference: 'STTEPS Tutoring, LLC Oregon November 05, 2026'
  }]*/

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    
    const status = entity.status;
    let statusColor;

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
            <td>{entity.dueDate}</td>
            <td className={statusColor}>{status}</td>
            <td>{entity.notes}</td>
            <td className='options' onClick={() => handleShowList(i)}>
              &#8942;
              <div className='entityOptions hidden' id={i}>
                <ul>
                  <li onClick={() => {handleShow(); setEdit(true); setEntityIndex(i); setEntity({...entity, name: entity.name, state: entity.state, dueDate: entity.dueDate, status: entity.status, notes: entity.notes});
                  }}>
                    Edit
                  </li>
                  <li className='delete' onClick={() => {setDeleteEntity(true); setEntity({...entity, name: entity.name, state: entity.state, dueDate: entity.dueDate, status: entity.status, notes: entity.notes});}}>
                    Delete
                  </li>
                </ul>
              </div>
            </td>
          </tr>
    )
  }

  const handleShowList = (i) => {
    const listContainerElement = document.getElementsByClassName('entityOptions')[i];
    const optionsLinkElement = document.getElementsByClassName('options')[i];

    if (listContainerElement.classList.contains('hidden')) {
      
      listContainerElement.classList.remove('hidden');

      document.addEventListener('click', e => {
        if (e.target !== listContainerElement && e.target !== optionsLinkElement) {
          listContainerElement.classList.add('hidden');
        }
      })
    } else {
      listContainerElement.classList.add('hidden');
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