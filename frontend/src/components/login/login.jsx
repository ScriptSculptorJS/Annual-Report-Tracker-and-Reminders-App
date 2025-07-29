import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/user.jsx';
import { useInfoStore } from '../../store/info.ts';
import { useAuthContext } from '../../hook/useAuthContext.jsx';
import './login.css';
 
function Login() {
  const [newUser, setNewUser] = useState({
    businessName: '',
    email: '',
    password: '',
  });
  const { user, dispatch } = useAuthContext();

  const navigate = useNavigate();
  const { loginUser, createUser } = useUserStore();
  const { updateEntities, entities } = useInfoStore();

  const handleUserLogin = async (e) => {
    e.preventDefault();

    const { success, message, data, status } = await loginUser(newUser, dispatch);
    console.log(data);

    if (!success) {
      alert(`
        Status: "${status}"
        Error: "${message}"`
      )
    } else {
      console.log('Success:', success);
      console.log('Message:', message);
      console.log('User:', data);

      updateEntities(data.entities)
      console.log('Entities: ', entities);

      /*setNewUser({
        firstName: '',
        email: '',
        password: '',
      });*/

      navigate('/profile/', { state: {data: data, id: data._id } });
    }
  };


  const handleUserSignup = async (e) => {
    e.preventDefault();
    
    const { success, message, data, status } = await createUser(newUser);

    /*setNewUser({
      firstName: '',
      email: '',
      password: '',
    });*/
    if (!data) {
      alert(`
        Status: "${status}"
        Error: "${message}"`
      )
    } else {
      Switch();

      console.log('Success:', success);
      console.log('Message:', message);
      console.log('User:', data)
    }
  }

  function Switch() {

    const loginCardElement = document.querySelector('.js-login-card');

    const signupCardElement = document.querySelector('.js-signup-card');

    if (signupCardElement.classList.contains('hidden')) {

      loginCardElement.classList.add('hidden');

      signupCardElement.classList.remove('hidden');

    } else if (loginCardElement.classList.contains('hidden')) {

      signupCardElement.classList.add('hidden');

      loginCardElement.classList.remove('hidden');

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
          />

          <input
            type='password'
            placeholder='Enter password'
            name='password'
            className='password-input'
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value})} 
          />

          <button 
            className='login-button js-login-button'
            onClick={handleUserLogin}>
              Login
          </button>

          <p className='login-link js-login-link' onClick={Switch}>Create account</p>
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
          />

          <input
            type='email'
            placeholder='Enter your email'
            name='email'
            className='email-input'
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })} 
          />

          <input
            type='password'
            placeholder='Enter a password'
            name='password'
            className='password-input'
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value})} 
          />

          <button 
            type='submit'
            className='sign-up-button js-sign-up-button'
            onClick={handleUserSignup}>
              Sign Up
          </button>

          <p className='sign-up-link js-sign-up-link' onClick={Switch}>Already have an account?</p>
      </div>
    </div>
  )
}

export default Login