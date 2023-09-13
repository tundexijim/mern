import React, { FormEvent, useState } from 'react'
import MainScreen from '../../MainScreen'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './LoginPage.css'
import axios from 'axios'
const LoginPage = () => {
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [error, setError] = useState<Boolean>(false);
const [loading, setLoading] = useState<Boolean>(false);

const submitHandler = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            },
        };
        setLoading(true)
        const {data}: any  = await axios.post(
            "/api/users/login",
            {
                email,
                password,
            },
            config
        ); 
        console.log(data)
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false)
    } catch (error: any) {
        setError(error.response.data.message)
        console.log(error.response.data.message)
    }
}
  return (
    <MainScreen title="LOGIN">
    <div className="loginContainer">
      <Form onSubmit={submitHandler}>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer ? <NavLink to="/register">Register Here</NavLink>
        </Col>
      </Row>
    </div>
  </MainScreen>
  )
}

export default LoginPage