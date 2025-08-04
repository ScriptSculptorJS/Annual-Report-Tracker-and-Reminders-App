import { useInfoStore } from '../../store/info.ts'
import { useUserStore } from '../../store/user.jsx'
import './entityTable.css'

function EntityTable({ handleShow, setEntity, setEdit, setEntityIndex, entity }) {

  const newEntitiesArray = []
  
  //Collects variables and methods to use later
  const { entities, updateEntities } = useInfoStore()
  const { deleteEntity } = useUserStore()
  
  //Order entities based on if it meets reminderFrequency or not
  const todayDate = new Date()
  const updatedEntitiesArray = entities
  const sortByCustomDateStart = (updatedEntitiesArray, month, day, year) => {
     updatedEntitiesArray.sort((a, b) => {
      
      const aDate = new Date(a.dueDate)
      const bDate = new Date(b.dueDate)
      const monthA = aDate.getMonth()
      const dayA = aDate.getDate()
      const monthB = bDate.getMonth()
      const dayB = bDate.getDate()

      if (monthA < month || (monthA === month && dayA < day)) {
        aDate.setFullYear(year + 1)
      }

      if (monthB < month || (monthB === month && dayB < day)) {
        bDate.setFullYear(year + 1)
      }

      return aDate.getTime() - bDate.getTime()
    })
  }
 
  sortByCustomDateStart(updatedEntitiesArray, todayDate.getMonth(), todayDate.getDate(), todayDate.getFullYear())

  //Interates through the entities array and creates HTML for each entity with specific styling based on its status
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i]
    const { status, name, state, notes, reminderFrequency, dueDate } = entity
    let statusColor
    const reminderMessage = []

    const dateFromMongo = new Date(dueDate)

    const findDayOfYear = (date) => {
      
      const startOfYear = new Date(date.getFullYear(), 0, 1)
      const diffInMilliseconds = date.getTime() - startOfYear.getTime()
      const millisecondsPerDay = 1000 * 60 * 60 * 24
      const dayOfYear = Math.floor(diffInMilliseconds / millisecondsPerDay) + 1

      return dayOfYear

    }

    const mongoDayOfYear = findDayOfYear(dateFromMongo)
    
    todayDate.setHours(0, 0, 0, 0)
    const todayDayOfYear = findDayOfYear(todayDate)

    const formattedDate = dateFromMongo.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    //Check what reminderFrequency is set for this entity
    if (reminderFrequency === '1 month before Due Date') {

      const oneMonthFromNow = new Date()
      oneMonthFromNow.setHours(0, 0, 0, 0)
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)

      const formattedOneMonthFromNow = oneMonthFromNow.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })

      if (formattedDate === formattedOneMonthFromNow) {

        reminderMessage.push(<td className='backgroundRed font-weight-bold'>Due in 1 month</td>)

      } else if ((mongoDayOfYear - todayDayOfYear) === 0) {

        reminderMessage.push(<td className='backgroundDeepRed font-weight-bold'>Due today!</td>)

      } else if ((mongoDayOfYear - todayDayOfYear) > 0 && (mongoDayOfYear - todayDayOfYear) < 31) {

        reminderMessage.push(<td className='backgroundDarkRed font-weight-bold'>Due in less than 1 month</td>)

      } else {

        reminderMessage.push(<td></td>)

      }

    } else if (reminderFrequency === '2 weeks before Due Date') {

      if ((mongoDayOfYear - todayDayOfYear) === 14) {

        reminderMessage.push(<td className='backgroundRed font-weight-bold'>Due in 2 weeks</td>)

      } else if ((mongoDayOfYear - todayDayOfYear) === 0) {

        reminderMessage.push(<td className='backgroundDeepRed font-weight-bold'>Due today!</td>)

      } else if ((mongoDayOfYear - todayDayOfYear) > 0 && (mongoDayOfYear - todayDayOfYear) < 14) {

        reminderMessage.push(<td className='backgroundDarkRed font-weight-bold'>Due in less than 2 weeks</td>)

      } else {

        reminderMessage.push(<td></td>)

      }

    } else if (reminderFrequency === '1 week before Due Date') {
      
      if ((mongoDayOfYear - todayDayOfYear) === 7) {

        reminderMessage.push(<td className='backgroundRed font-weight-bold'>Due in 1 week</td>)

      } else if ((mongoDayOfYear - todayDayOfYear) === 0) {

        reminderMessage.push(<td className='backgroundDeepRed font-weight-bold'>Due today!</td>)

      } else if ((mongoDayOfYear - todayDayOfYear) > 0 && (mongoDayOfYear - todayDayOfYear) < 7) {

        reminderMessage.push(<td className='backgroundDarkRed font-weight-bold'>Due in less than 1 week</td>)

      } else {

        reminderMessage.push(<td></td>)

      }

    } else if (reminderFrequency === 'On Due Date') {
      
      if ((mongoDayOfYear - todayDayOfYear) === 0) {

        reminderMessage.push(<td className='backgroundDeepRed font-weight-bold'>Due today!</td>)

      } else {

        reminderMessage.push(<td></td>)

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
            <th scope="row" className='fw-normal'>{name}</th>
            <td>{state}</td>
            {reminderMessage}
            <td>{formattedDate}</td>
            <td className={statusColor}>{status}</td>
            <td>{notes}</td>
            <td className='options' onClick={() => handleShowList(i)}>
              &#8942;
              <div className='entityOptions hidden' id={i}>
                <ul>
                  <li onClick={() => {
                    handleShow(); 
                    setEdit(true); 
                    setEntityIndex(i); 
                    setEntity({...entity, name: name, state: state, dueDate: formattedDate, status: status, notes: notes});
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

    const listContainerElement = document.getElementsByClassName('entityOptions')[i]
    const optionsLinkElement = document.getElementsByClassName('options')[i]

    if (listContainerElement.classList.contains('hidden')) {
      
      listContainerElement.classList.remove('hidden')

      //Add an event listener to see if the user clicks outside of the ellipsis or dropdown menu to edit or delete and hides the dropdown
      document.addEventListener('click', e => {

        if (e.target !== listContainerElement && e.target !== optionsLinkElement) {

          listContainerElement.classList.add('hidden')

        }
      })

    } else {

      listContainerElement.classList.add('hidden')

    }
  }

  //Deletes entity from database and updates entities in the info store
  const deleteEntityObject = async (entityId) => {

    const updatedContent = await deleteEntity(entityId)

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

export default EntityTable