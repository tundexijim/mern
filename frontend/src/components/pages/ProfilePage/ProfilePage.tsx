import React, { FormEvent, useState, useEffect } from "react";
import MainScreen from "../../MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import Loading from "../../Loading";
import Errormsg from "../../Errormsg";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { updateProfile } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pic, setPic] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [picMessage, setPicMessage] = useState<string | null>();
  const [message, setMessage] = useState<string | null>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userUpdate = useAppSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;
  const userLogin = useAppSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);
  const postDetails = (pics: any) => {
    setPicMessage(null);
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
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
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateProfile({ name, email, password, pic }));
    }
    // window.location.reload();
  };
  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <Errormsg variant="success">Updated Successfully</Errormsg>
              )}
              {error && <Errormsg variant="danger">{error}</Errormsg>}
              {message && <Errormsg variant="danger">{message}</Errormsg>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && <Errormsg variant="danger">{picMessage}</Errormsg>}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  onChange={(e: any) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="file"
                />
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                style={{ marginTop: "10px" }}
              >
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfilePage;
