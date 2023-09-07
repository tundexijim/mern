import React from 'react'
import {Container, Row, Button} from 'react-bootstrap'
import './LandingPage.css'
import { NavLink } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div className='main'>
       <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Note Zipper</h1>
              <p className="subtitle">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <NavLink to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </NavLink>
              <NavLink to="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </NavLink>
            </div>
          </div>
        </Row>
      
       </Container>
    </div>
  )
}

export default LandingPage