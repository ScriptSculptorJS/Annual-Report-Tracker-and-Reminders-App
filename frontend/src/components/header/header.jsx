import './header.css'

function Header({ name }) {

  return(
    <div className='header'>
      <h1>Welcome {name}!</h1>
    </div>
  )
}

export default Header