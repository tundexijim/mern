import React, { FormEvent, useState, useEffect } from "react";
import MainScreen from "../../MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Loading from "../../Loading";
import Errormsg from "../../Errormsg";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { RootState } from "../../../store";
import { login } from "../../../actions/userAction";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userLogin = useAppSelector((state: RootState) => state.userLogin);

  const { loading, error, userInfo }: any = userLogin;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState<Boolean>(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password));
    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };
    //   setLoading(true);
    //   const { data }: { data: user[] } = await axios.post(
    //     "/api/users/login",
    //     {
    //       email,
    //       password,
    //     },
    //     config
    //   );
    //   console.log(data);
    //   localStorage.setItem("userInfo", JSON.stringify(data));
    //   setLoading(false);
    // } catch (error: any) {
    //   setError(error.response.data.message);
    //   setLoading(false);
    // }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);
  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <Errormsg variant="danger">{error}</Errormsg>}
        {loading && <Loading />}
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

          <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <NavLink to="/signup">Register Here</NavLink>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginPage;
