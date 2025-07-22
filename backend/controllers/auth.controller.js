import User from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// create token with user id
const createAccessToken = (id) => {
  return jwt.sign(
    {id}, 
    process.env.ACCESS_TOKEN_SECRET, 
    //set this to 15 minutes later
    { expiresIn: '15m' });
};

const createRefreshToken = (id) => {
  return jwt.sign(
    {id}, 
    process.env.REFRESH_TOKEN_SECRET, 
    // set this to 7 days (7d) later
    { expiresIn: '7d' });
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === '' || password === '') {
      res.json({ 
        status: 'Bad Request',
        message: 'Please provide all fields.',
        success: false
      })
      return;
    }

    if (!validator.isEmail(email)) {
      res.json({
        status: 'Bad Request',
        message: 'Email is not valid.',
        success: false
      })
      return;
    };

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      res.json({
        status: 'Not Found',
        message: 'User not found. Try again or sign up with a new account.',
        success: false
      });
      return;
    };

    const validPassword = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!validPassword) {
      res.json({
        status: 'Unauthorized',
        message: 'Password is incorrect.',
        success: false
      });
      return;
    };

    console.log('In login', foundUser._id);
    const accessToken = createAccessToken(foundUser._id);

    const refreshToken = createRefreshToken(foundUser._id);

    res.cookie('accessToken', accessToken, {
      maxAge: 15 * 60 * 1000, // 15 minute
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: 'none', //cross-site cookie availability
      //maxAge: 5* 60 * 1000, // 5 minutes
      maxAge: 7 * 24 * 60 * 1000, //cookie expiry: set to match rT(refreshToken) (ex: 7*24*60*60*1000 = 7 days)
    })

    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    res.status(200).json({ 
      success: true, 
      data: foundUser, 
    });
  } catch (err) {
    console.error('Internal Server Error:', err.message);
    res.json({ 
      success: false, 
      status: 'Internal Server Error',
      message: 'User not logged in due to our side of things.'
    })
  }
};

export const logout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204);
  };

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  res.json({ message: 'Cookie cleared' });
};