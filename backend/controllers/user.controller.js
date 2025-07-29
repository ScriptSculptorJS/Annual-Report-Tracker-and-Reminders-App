import User from '../models/users.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

export const getAccess = async (req, res) => {
  return res.json({ valid: true, message: 'Authorized'});
};

export const createUser = async (req, res) => {
  const user = req.body; // user will send this data
  console.log(req.body, 'with non-hashed password');

  try {
    if (user.email === '' || user.password === '') {
      res.json({ 
        status: 'Bad Request',
        message: 'Please provide all fields.',
        success: false
      })
      return;
    }

    if (!validator.isEmail(user.email)) {
      res.json({
        status: 'Bad Request',
        message: 'Email is not valid.',
        success: false
      })
      return;
    }

    const exists = await User.findOne({ email: user.email });
    console.log(exists, 'exists');

    if (exists) {
      res.json({
        status: 'Bad Request',
        message: 'Email already exists. Try logging in with email.',
        success: false
      })
      return;
    } else {
      // Generate salt and hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const newUser = new User({
        ...user,
        password: hashedPassword,
      });

      console.log(newUser, 'with hashed password now');

      const newentry = await newUser.save();
      console.log('Is id here?', newentry);

      console.log('New user created. Please log in: ', newentry);

      res.status(201).json({
        user: newentry,
        success: true
      })
    }

  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        status: 'Bad Request',
        message: err.message,
        success: false
      })

    } else {
      console.error('Internal Server Error:', err);
      res.status(500).json({ 
        success: false, 
        status: 'Internal Server Error',
        message: 'User not created due to our side of things.'
      });
    }
  }
};

export const updateUser = async (req, res) => {
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
    
    res.status(200).json({ success: true, data: updatedInfo, status: '200' });

  } catch (error) {
    res.json({ success: false, message: 'Server error', status: '500'});
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'User not found'});
  }
  
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User deleted'})
  } catch (err) {
    console.log('Error in deleting user:', err.message);
    res.status(500).json({ success: false, message: 'Server error'});
  }
}