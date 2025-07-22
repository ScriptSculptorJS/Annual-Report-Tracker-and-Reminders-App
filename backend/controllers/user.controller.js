import User from '../models/users.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

export const getAccess = async (req, res) => {
  return res.json({ valid: true, message: 'Authorized'});
};

export const createUser = async (req, res) => {
  const user = req.body; // user will send this data
  console.log(req.body, 'with non-hashed password');

  try {
    const exists = await User.findOne({ email: user.email });

    if (!user.email || !user.password) {
      alert('Please provide all fields')
    };

    if (!validator.isEmail(user.email)) {
      alert('Email is not valid');
    }

    if (exists) {
      alert('Email already exists');
    };

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
      user: newentry
    })

  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        status: '400 Bad Request',
        message: err.message
      })

    } else {
      console.error('Internal Server Error:', err);
      res.status(500).json({ 
        success: false, 
        status: '500 Internal Server Error',
        message: '500 Internal Server Error, User not created'
      });
    }
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'User not found'});
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json({ success: true, data: updatedUser });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error'});
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