import User from '../models/users.model.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

export const createEntity = async (req, res) => {
  //{ id } is helpful when we are storing the id in the params, but with the authentication we want to collect it from the cookies to make it more secure
  /*const { id } = req.params;

  const user = req.body;*/
  console.log('we are in backend to create entity')
  const newInfo = req.body;
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
      $push: {
        entities: [newInfo.newObject],
        $position: 0
      }
    }, { new: true });

    res.json({ success: true, data: updatedInfo, status: '200' });

  } catch (error) {
    res.json({ success: false, message: 'Server error', status: '500'});
  }
}

export const updateEntity = async (req, res) => {
  //{ id } is helpful when we are storing the id in the params, but with the authentication we want to collect it from the cookies to make it more secure
  /*const { id } = req.params;

  const user = req.body;*/

  const newInfo = req.body;
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
        [`entities.${newInfo.index}.name`]: newInfo.newObject.name,
        [`entities.${newInfo.index}.state`]: newInfo.newObject.state,
        [`entities.${newInfo.index}.dueDate`]: newInfo.newObject.dueDate,
        [`entities.${newInfo.index}.status`]: newInfo.newObject.status,
        [`entities.${newInfo.index}.notes`]: newInfo.newObject.notes,
        [`entities.${newInfo.index}. userReference`]: newInfo.newObject.userReference
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

  const newInfo = req.body;
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
      $pull: {
        entities: {
          userReference: newInfo.newObject,
        }
      }
    }, { new: true });

    res.json({ success: true, data: updatedInfo, status: '200' });

  } catch (error) {
    res.json({ success: false, message: 'Server error', status: '500'});
  }
}