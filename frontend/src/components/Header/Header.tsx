import React from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useAppDispatch, useAppSelector } from "../../hook";
import { RootState } from "../../store";

const Header = ({ setSearch }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLogin = useAppSelector((state: RootState) => state.userLogin);
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <NavLink to="/">Notes</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userLogin.userInfo ? (
            <Nav style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link>
                <NavLink to="/mynotes">My Notes</NavLink>
              </Nav.Link>
              <NavDropdown
                title={userLogin.userInfo?.name}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              {" "}
              <Nav.Link>
                <NavLink to="/login">Login</NavLink>
              </Nav.Link>{" "}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
