import { useInfoStore } from '../../store/info.ts';
import { useUserStore } from '../../store/user.jsx';
import './entityTable.css';

function EntityTable({ handleShow, setEntity, setEdit, setEntityIndex, entity }) {

  const newEntitiesArray = [];
  
  //Collects variables and methods to use later
  const { entities, updateEntities } = useInfoStore();
  const { deleteEntity } = useUserStore();
  
  //Order entities based on if it meets reminderFrequency or not
  console.log(entities);
  const todayDate = new Date();
  console.log(todayDate.getMonth(), todayDate.getDate());
  const sortByCustomDateStart = (entities, month, day, year) => {
     entities.sort((a, b) => {
      
      console.log(month, day, year);
      const aDate = new Date(a.dueDate)
      const bDate = new Date(b.dueDate);
      const monthA = aDate.getMonth();
      const dayA = aDate.getDate();
      const monthB = bDate.getMonth();
      const dayB = bDate.getDate();

      if (monthA < month || (monthA === month && dayA < day)) {
        aDate.setFullYear(year + 1);
      }

      if (monthB < month || (monthB === month && dayB < day)) {
        bDate.setFullYear(year + 1);
      }

      return aDate.getTime() - bDate.getTime();
    })
  }
 
  sortByCustomDateStart(entities, todayDate.getMonth(), todayDate.getDate(), todayDate.getFullYear())
  console.log(entities)
  

  //Interates through the entities array and creates HTML for each entity with specific styling based on its status
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const status = entity.status;
    let statusColor;
    let background;
    const reminderMessage = [];

    const dateFromMongo = new Date(entity.dueDate);

    const formattedDate = dateFromMongo.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric'
    })

    //Check what reminderFrequency is set for this entity
    if (entity.reminderFrequency === '1 month before Due Date') {
      //Create date 1 month from now
      const oneMonthFromNow = new Date();
      
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

      const formattedOneMonthFromNow = oneMonthFromNow.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric'
      })

      if (formattedDate === formattedOneMonthFromNow) {
        reminderMessage.push(<td className='backgroundRed font-weight-bold'>Due in 1 month</td>);
      } else {
        reminderMessage.push(<td></td>)
      }

    } else if (entity.reminderFrequency === '2 weeks before Due Date') {
      //Create date 14 days from now
      const twoWeeksFromNow = new Date();
      
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

      const formattedTwoWeeksFromNow = twoWeeksFromNow.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric'
      })

      if (formattedDate === formattedTwoWeeksFromNow) {
        reminderMessage.push(<td className='backgroundRed font-weight-bold'>Due in 2 weeks</td>);
      } else {
        reminderMessage.push(<td></td>)
      }
    } else if (entity.reminderFrequency === '1 week before Due Date') {
      //Create date 7 days from now
      const sevenDaysFromNow = new Date();
      
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      
      const formattedSevenDaysFromNow = sevenDaysFromNow.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric'
      })

      if (formattedDate === formattedSevenDaysFromNow) {
        reminderMessage.push(<td className='backgroundRed font-weight-bold'>Due in 7 days</td>);
      } else {
        reminderMessage.push(<td></td>)
      }

    } else if (entity.reminderFrequency === 'On Due Date') {
      //Create date 0 days from now
      const zeroDaysFromNow = new Date();
      
      const formattedZeroDaysFromNow = zeroDaysFromNow.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric'
      })

      if (formattedDate === formattedZeroDaysFromNow) {

        reminderMessage.push(<td className='backgroundRed font-weight-bold'>Due today</td>);
        
      } else {

        reminderMessage.push(<td></td>)
        background = ''

      }
    }

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
            {reminderMessage}
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
          <th scope='col'>Reminder</th>
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