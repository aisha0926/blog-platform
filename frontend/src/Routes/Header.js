import { Link } from 'react-router-dom';


function Header () {
    return ( 
        <header>
        <Link to="/" className="logo"> Brand</Link>
        <nav>
          <Link  to="/login"> Login </Link>
          <Link to="/register"> Create Account </Link>
        </nav>
      </header>
     );
}

export default Header ;