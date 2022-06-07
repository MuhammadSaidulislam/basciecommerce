import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

import { isAuthenticate, itemTotal } from '../../api/auth'
import './Navigation.css'
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate=useNavigate()
  const [length,setLength]=useState('')
  useEffect(() => {
    setLength(itemTotal())
  }, [])
  const logout=()=>{
    window.localStorage.clear();
    return navigate('/')
  }
  
  return (
    <>

      <header className="section-header">

        <nav className="navbar navbar-dark navbar-expand p-0 bg-dark">
          <div className="container">
            <ul className="navbar-nav d-none d-md-flex mr-auto">
              <li className="nav-item"><Link className="nav-link" to='/'>E-commerce</Link></li>
            </ul>
            <ul className="navbar-nav d-flex">
              <li className="nav-item">
                <Link to="/" className="d-flex ">Home</Link>
              </li>
              {isAuthenticate() && (
                <>
                <li className="nav-item">
                <Link to="/cart" className="d-flex">Cart {length && length>0 ? <span>({length})</span> :null}</Link>
              </li>
              <li className="nav-item">
              <Link to="" onClick={logout} className="d-flex">Logout</Link>
            </li>
                </>
              )}
            
              
              {!isAuthenticate() && (
                <>
                <li className="nav-item">
                <Link to="/login" className="d-flex">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="d-flex">Registration</Link>
              </li>
                </>
              )}
             
            </ul>
          </div>

        </nav>



      </header>
    </>
  )
}

export default Navigation