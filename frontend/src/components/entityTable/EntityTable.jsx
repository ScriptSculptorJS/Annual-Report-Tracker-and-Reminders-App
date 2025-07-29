import { useInfoStore } from '../../store/info.ts';

function EntityTable(user) {
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
          </tr>
    )
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
        </tr>
      </thead>
      <tbody>
        {newEntitiesArray}
      </tbody>
    </table>
  )
}

export default EntityTable;