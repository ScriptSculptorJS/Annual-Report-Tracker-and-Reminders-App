import jwt from 'jsonwebtoken'

const createAccessToken = (id) => {

  return jwt.sign(
    {id}, 
    process.env.ACCESS_TOKEN_SECRET, 
    //set this to 15 minutes later
    { expiresIn: '15m' }
  )

}

const verifyUser = async (req, res, next) => {
  
  const accessToken = req.cookies.accessToken
  
  if (!accessToken) {

    const refreshToken = req.cookies.refreshToken
    
    if (!refreshToken) {

      return res.json({ valid: false, message: 'No refresh token' })

    } else {

      jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
          if (err) {
            return res.json({ valid: false, success: false, message: 'Invalid refresh token' })
          } else {
            const accessToken = createAccessToken(decoded._id);
            res.cookie(
              'accessToken', 
              accessToken, 
              {
                maxAge: 15 * 60 * 1000, // 15 minute
              }
            )
          }
        }
      )
    }

    if (res) {
      next();
    }

  } else {

    jwt.verify(
      accessToken, 
      process.env.ACCESS_TOKEN_SECRET, 
      (err, decoded) => {
        if (err) {
          return res.json({ valid: false, message: 'Invalid Access Token in cookies: ' + err })
        } else {
          req._id = decoded._id;
          next()
        }
      }
    )
  }
}

export default verifyUser