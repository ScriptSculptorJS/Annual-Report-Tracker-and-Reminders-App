import './header.css'
import { useUserStore } from '../../store/user.jsx';

function Header({ name }) {

  const { logOutUser } = useUserStore()

  const handleLogout = async () => {
    
    const res = await logOutUser();

    if (res.loggedOut === true) {
      window.location.reload();
    }

  }

  return(
    <>
      <div className='logout-container'>
        <span onClick={() => handleLogout()}>
          Logout
        </span>
      </div>
      <div className='header'>
        <h1 className='font-weight-normal'>Welcome {name}!</h1>
      </div>
    </>
    
  )
}

export default Header