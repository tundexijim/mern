import React, { FormEvent, useEffect, useState } from "react";
import MainScreen from "../../MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import Errormsg from "../../Errormsg";
import Loading from "../../Loading";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { Signup } from "../../../actions/userAction";

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const userSignup = useAppSelector((state) => state.userSignup);
  const navigate = useNavigate();
  const { loading, error, userInfo } = userSignup;
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pic, setPic] = useState<string>(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>("");
  const [picMessage, setPicMessage] = useState<string | null>(null);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(Signup(name, email, password, pic));
    }
  };

  const postDetails = (pics: any) => {
    setPicMessage(null);
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "tundexijim");
      fetch("https://api.cloudinary.com/v1_1/tundexijim/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url.toString());
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <Errormsg variant="danger">{error}</Errormsg>}
        {message && <Errormsg variant="danger">{message}</Errormsg>}
        {loading && <Loading />}
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

          {picMessage && <Errormsg variant="danger">{picMessage}</Errormsg>}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e: any) => postDetails(e.target.files[0])}
              id="custom-file"
              type="file"
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
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
  );
};

export default SignupPage;
