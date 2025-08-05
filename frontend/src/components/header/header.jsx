import './header.css'

function Header({ name }) {

  return(
    <div className='header'>
      <h1 className='font-weight-normal'>Welcome {name}!</h1>
    </div>
  )
}

export default Header