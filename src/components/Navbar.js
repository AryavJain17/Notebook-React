import React from 'react'
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from 'react-router-dom'


const Navbar = () => {
  let navigate = useNavigate();
  const handleLogoout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active" : ""}`} to="/">Home <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active" : ""}`} to="/about">About</Link>
        </li>
      
       
      </ul>
      {!localStorage.getItem('token') ? <form className="form-inline my-2 my-lg-0">

          <Link className="btn btn-primary mx-2" to="/login" rolw="button">Log In</Link>
          <Link className="btn btn-primary mx-2" to="/signup" rolw="Sign Up">Sign Up</Link>
      </form> : <button onClick={handleLogoout} className='btn btn-primary'>Logout</button>}
    </div>
  </nav>
  )
}

export default Navbar