import React, { FormEvent, useState } from 'react'
import MainScreen from '../../MainScreen'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './SignupPage.css'
const SignupPage = () => {
    const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    console.log(email);
    
  }
  return (
    <MainScreen title="REGISTER">
    <div className="loginContainer">
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmpassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {/* {picMessage && (
          <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
        )} */}
        <Form.Group controlId="pic">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            // onChange={(e) => postDetails(e.target.files[0])}
            id="custom-file"
            type="file"
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{marginTop: "10px"}}>
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account ? <NavLink to="/login">Login</NavLink>
        </Col>
      </Row>
    </div>
  </MainScreen>
  )
}

export default SignupPage