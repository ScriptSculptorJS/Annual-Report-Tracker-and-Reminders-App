import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/user.jsx'
import { useInfoStore } from '../../store/info.ts'
import './login.css'
 
function Login() {

  const [newUser, setNewUser] = useState({
    businessName: '',
    email: '',
    password: '',
  })

  const { loginUser, createUser } = useUserStore()
  const { updateEntities, updateBusinessName } = useInfoStore()

  const navigate = useNavigate()

  //Accessing two elements in the HTML
  let loginCardElement = document.querySelector('.js-login-card');
  let signupCardElement = document.querySelector('.js-signup-card');

  //Runs api request to get user, alert if any errors occurred with why it happened, if successful updates entities in info store and navigates user to their profile
  const handleUserLogin = async (e) => {

    const { success, message, data, status } = await loginUser(newUser)

    if (!success) {

      alert(`
        Status: "${status}"
        Error: "${message}"`
      )

    } else {

      console.log('Success:', success)
      console.log('Message:', message)
      console.log('User:', data)

      updateEntities(data.entities)
      updateBusinessName(data.businessName)

      navigate('/profile/', { state: {data: data, id: data._id } })

    }
  }

  //Creates new user, alerts user of any errors that may have occurred in the creation with a message, if successful switches to the login form with fields filled
  const handleUserSignup = async (e) => {
    
    const { success, message, data, status } = await createUser(newUser)

    if (!data) {

      alert(`
        Status: "${status}"
        Error: "${message}"`
      )

    } else {

      Switch()

      console.log('Success:', success)
      console.log('Message:', message)
      console.log('User:', data)

    }
  }

  //Checks if user clicked Enter button and determines whether it was when they were on the login or signup card, then calls the appropriate function to either sign them up or log them in
  function handleKeyDown(e) {

    if (e.key === 'Enter' && loginCardElement.classList.contains('hidden')) {

      handleUserSignup()

    } else if (e.key === 'Enter' && signupCardElement.classList.contains('hidden')) {

      handleUserLogin()

    }
  }

  //This will allow a user to hit the enter key again once they were sent back to the login page after creating an account so they can quickly login without clicking the button
  document.addEventListener('keydown', function(e) {

    if (e.key === 'Enter' && loginCardElement.classList.contains('hidden')) {

      handleUserSignup()

    } else if (e.key === 'Enter' && signupCardElement.classList.contains('hidden')) {

      handleUserLogin()

    }
    
  })

  //Switches from login form to signup form and vice versa
  function Switch() {

    const loginCardElement = document.querySelector('.js-login-card')

    const signupCardElement = document.querySelector('.js-signup-card')

    if (signupCardElement.classList.contains('hidden')) {

      loginCardElement.classList.add('hidden')

      signupCardElement.classList.remove('hidden')

    } else if (loginCardElement.classList.contains('hidden')) {

      signupCardElement.classList.add('hidden')

      loginCardElement.classList.remove('hidden')

    }
  }

  return(
    <div className='login-signup-container'>
      <h1 className='app-name'>
        Annual Report Tracker & Reminder
      </h1>
      <p className='app-description'>
        Keep track of all your business' annual reports and schedule reminders.
      </p>
      <div className='login-card js-login-card'>
          <input
            type='email'
            placeholder='Enter email'
            name='email'
            className='email-input'
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })} 
            onKeyDown={handleKeyDown}
          />

          <input
            type='password'
            placeholder='Enter password'
            name='password'
            className='password-input'
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value})} 
            onKeyDown={handleKeyDown}
          />

          <button 
            className='login-button js-login-button'
            onClick={handleUserLogin}>
              Login
          </button>

          <p className='login-link js-login-link' onClick={Switch}>
            Create account
          </p>
      </div>
      <div 
        className='signup-card js-signup-card hidden'
      >
          <input  
            type='text'
            placeholder='Enter your business name'
            name='bname'
            className='bname-input'
            value={newUser.businessName}
            onChange={e => setNewUser({ ...newUser, businessName: e.target.value})}
            onKeyDown={handleKeyDown}
          />

          <input
            type='email'
            placeholder='Enter your email'
            name='email'
            className='email-input'
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })} 
            onKeyDown={handleKeyDown}
          />

          <input
            type='password'
            placeholder='Enter a password'
            name='password'
            className='password-input'
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value})} 
            onKeyDown={handleKeyDown}
          />

          <button 
            type='submit'
            className='sign-up-button js-sign-up-button'
            onClick={handleUserSignup}>
              Sign Up
          </button>

          <p className='sign-up-link js-sign-up-link' onClick={Switch}>
            Already have an account?
          </p>
      </div>
    </div>
  )
}

export default Login