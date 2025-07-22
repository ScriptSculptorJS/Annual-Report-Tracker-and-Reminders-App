import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/user.js'

function Profile() {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const { checkAccess } = useUserStore();

  useEffect(() => {
    async function checkingTokenAccess() {
      console.log('is this triggering upon refreshing page?');
      const res = await checkAccess();
      console.log(res);
      if (!res.valid) {
        navigate('/')
      }
    }
    checkingTokenAccess();
  })
  //const signOut = useSignOut();
  //const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const user = location.state.data;
  console.log(id)
  
  console.log(user);

  //console.log(JSON.parse(localStorage.getItem('user')));

  /*const logout = () => {
    navigate...
  }*/

  // When have a logout button use logout function
  return(
    <>
      <p>{user.firstName}</p>
      <p>{id}</p>
      <p>{message}</p>
    </>
  )
};

export default Profile