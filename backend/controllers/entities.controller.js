import User from '../models/users.model.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

export const createEntity = async (req, res) => {
  //{ id } is helpful when we are storing the id in the params, but with the authentication we want to collect it from the cookies to make it more secure
  /*const { id } = req.params;

  const user = req.body;*/
  console.log('we are in backend to create entity')
  const newInfo = req.body;
   const dateFormatRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/

  if (newInfo.name === '' || newInfo.state === '' || newInfo.dueDate === '' || newInfo.status === '') {
    return res.json({ success: false, message: 'All fields must be filled except for Notes', status: 'Bad request' })
  }

  if (!dateFormatRegex.test(newInfo.dueDate)) {
    return res.json({ success: false, message: 'Date is not in valid formatting', status: 'Bad request'})
  }

  const access = req.cookies.accessToken;
  let updatedInfo;
  
  const decoded = jwt.decode(access);
  const id = decoded.id
  console.log('what info shows up here', newInfo, access, id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ success: false, message: 'User not found', status: '404'});
  }

  const newObjectId = new mongoose.Types.ObjectId();


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
    }, { new: true });

    res.json({ success: true, data: updatedInfo, status: '200' });

  } catch (error) {
    res.json({ success: false, message: error, status: '500'});
  }
}

export const updateEntity = async (req, res) => {
  //{ id } is helpful when we are storing the id in the params, but with the authentication we want to collect it from the cookies to make it more secure
  /*const { id } = req.params;

  const user = req.body;*/

  const newInfo = req.body;
  const dateFormatRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/

  if (newInfo.entity.name === '' || newInfo.entity.state === '' || newInfo.entity.dueDate === '' || newInfo.entity.status === '') {
    return res.json({ success: false, message: 'All fields must be filled except for Notes', status: 'Bad request' })
  }
  console.log(dateFormatRegex.test(newInfo.dueDate))

  if (!dateFormatRegex.test(newInfo.dueDate)) {
    return res.json({ success: false, message: 'Date is not in valid formatting', status: 'Bad request'})
  }

  const access = req.cookies.accessToken;
  let updatedInfo;

  const decoded = jwt.decode(access);
  const id = decoded.id
  console.log(newInfo, access, id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ success: false, message: 'User not found', status: '404'});
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
    }, { new: true });
    
    res.json({ success: true, data: updatedInfo, status: '200' });

  } catch (error) {
    res.json({ success: false, message: 'Server error', status: '500'});
  }
}

export const deleteEntity = async (req, res) => {
  //{ id } is helpful when we are storing the id in the params, but with the authentication we want to collect it from the cookies to make it more secure
  /*const { id } = req.params;

  const user = req.body;*/
  
  const { entityId } = req.body;
  const access = req.cookies.accessToken;
  let updatedInfo;

  const decoded = jwt.decode(access);
  const id = decoded.id
  console.log('this is where the id should be',entityId, access, id);

  if (!entityId) {
    return res.json({ success: false, message: 'Unable to delete the entity due to missing', status: 'Bad request' })
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ success: false, message: 'User not found', status: '404'});
  }

  try {
    
    updatedInfo = await User.findByIdAndUpdate(id, {
      $pull: {
        entities: {
          _id: entityId,
        }
      }
    }, { new: true });

    res.json({ success: true, data: updatedInfo, status: '200' });

  } catch (error) {
    res.json({ success: false, message: 'Server error', status: '500'});
  }
}