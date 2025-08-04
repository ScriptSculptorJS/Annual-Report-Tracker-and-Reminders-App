import User from '../models/users.model.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

export const createEntity = async (req, res) => {
  
  const newInfo = req.body

  const dateFormatRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/

  const todayDate = new Date()

  const date = new Date(newInfo.dueDate)

  todayDate.setHours(0, 0, 0, 0)

  date.setHours(0, 0, 0, 0)


  if (date.getMonth() < todayDate.getMonth() || (date.getMonth() === todayDate.getMonth() && date.getDate() < todayDate.getDate())) {

    date.setFullYear(todayDate.getFullYear() + 1)
    const dateString = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    newInfo.dueDate = dateString

  }

  if (newInfo.name === '' || newInfo.state === 'Entity state' || newInfo.dueDate === '' || newInfo.reminderFrequency === 'Set reminder' || newInfo.status === 'Status') {
    console.log(`don't have all info`)

    return res.json({ success: false, message: 'All fields must be filled except for Notes', status: 'Bad request' })

  }

  if (!dateFormatRegex.test(newInfo.dueDate)) {

    return res.json({ success: false, message: 'Date is not in valid formatting', status: 'Bad request'})

  }

  const access = req.cookies.accessToken;
  let updatedInfo
  
  const decoded = jwt.decode(access)
  const id = decoded.id

  if (!mongoose.Types.ObjectId.isValid(id)) {

    return res.json({ success: false, message: 'User not found', status: '404'})

  }

  const newObjectId = new mongoose.Types.ObjectId()


  try {
    updatedInfo = await User.findByIdAndUpdate(id, {
      $push: {
        entities: {
            _id: newObjectId,
            name: newInfo.name,
            state: newInfo.state,
            dueDate: newInfo.dueDate,
            reminderFrequency: newInfo.reminderFrequency,
            status: newInfo.status,
            notes: newInfo.notes
          },
          $position: 0
      }
    }, { new: true })

    res.json({ success: true, data: updatedInfo, status: '200' })

  } catch (err) {

    console.error('Internal Server Error:', err)

    res.json({ success: false, message: error, status: '500'})

  }
}

export const updateEntity = async (req, res) => {
  
  const newInfo = req.body

  const dateFormatRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/
  
  const todayDate = new Date()
  const date = new Date(newInfo.entity.dueDate)

  todayDate.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  if (date.getMonth() > todayDate.getMonth() || (date.getMonth() === todayDate.getMonth() && date.getDate() > todayDate.getDate())) {

    date.setFullYear(todayDate.getFullYear())
    
    const dateString = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    newInfo.entity.dueDate = dateString

  } else if (date.getFullYear() < todayDate.getFullYear() && date.getMonth() < todayDate.getMonth() || (date.getMonth() === todayDate.getMonth() && date.getDate() < todayDate.getDate())) {

    date.setFullYear(todayDate.getFullYear() + 1)
   
    const dateString = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    newInfo.entity.dueDate = dateString
    
  }

  if (newInfo.entity.name === '' || newInfo.entity.state === 'Entity state' || newInfo.entity.dueDate === '' || newInfo.reminderFrequency === 'Set reminder' || newInfo.entity.status === 'Status') {

    return res.json({ success: false, message: 'All fields must be filled except for Notes', status: 'Bad request' })

  }

  if (!dateFormatRegex.test(newInfo.entity.dueDate)) {

    return res.json({ success: false, message: 'Date is not in valid formatting', status: 'Bad request'})

  }

  const access = req.cookies.accessToken;
  let updatedInfo
  const decoded = jwt.decode(access);
  const id = decoded.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ success: false, message: 'User not found', status: '404'})
  }

  try {
    
    updatedInfo = await User.findByIdAndUpdate(id, {
      $set: {
        [`entities.${newInfo.index}.name`]: newInfo.entity.name,
        [`entities.${newInfo.index}.state`]: newInfo.entity.state,
        [`entities.${newInfo.index}.dueDate`]: newInfo.entity.dueDate,
        [`entities.${newInfo.index}.reminderFrequency`]: newInfo.entity.reminderFrequency,
        [`entities.${newInfo.index}.status`]: newInfo.entity.status,
        [`entities.${newInfo.index}.notes`]: newInfo.entity.notes
      }
    }, { new: true })
    
    res.json({ success: true, data: updatedInfo, status: '200' })

  } catch (err) {

    console.error('Internal Server Error:', err)

    res.json({ success: false, message: 'Server error', status: '500'})

  }
}

export const deleteEntity = async (req, res) => {
  
  const { entityId } = req.body
  const access = req.cookies.accessToken
  let updatedInfo
  const decoded = jwt.decode(access);
  const id = decoded.id

  if (!entityId) {

    return res.json({ success: false, message: 'Unable to delete the entity due to missing', status: 'Bad request' })

  }

  if (!mongoose.Types.ObjectId.isValid(id)) {

    return res.json({ success: false, message: 'User not found', status: '404'})

  }

  try {
    
    updatedInfo = await User.findByIdAndUpdate(id, {
      $pull: {
        entities: {
          _id: entityId,
        }
      }
    }, { new: true })

    res.json({ success: true, data: updatedInfo, status: '200' })

  } catch (err) {

    console.error('Internal Server Error:', err)

    res.json({ success: false, message: 'Server error', status: '500'})

  }
}