import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    <>
      {/*
    <section className='navigation'>
     <Navbar expand="lg">
     <Container>
       <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
       <Navbar.Toggle aria-controls="navbarScroll" />
       <Navbar.Collapse id="navbarScroll">
         <Nav
           className="ml-auto my-2 my-lg-0 navLink"
           style={{ maxHeight: '100px' }}
           navbarScroll
         >
           <Link to="/">Home</Link>
           <Link to="/cart">Cart</Link>
           <Link to="/login">Login</Link>
           <Link to="/registration">Signup</Link>
         </Nav>
       </Navbar.Collapse>
     </Container>
   </Navbar>
     </section>
    */}

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
              <li className="nav-item">
                <Link to="/cart" className="d-flex">Cart</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="d-flex">Sign in</Link>
              </li>
              <li className="nav-item">
                <Link to="/registration" className="d-flex">Sign up</Link>
              </li>
            </ul>
          </div>

        </nav>



      </header>
    </>
  )
}

export default Navigation