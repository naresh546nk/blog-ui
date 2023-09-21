import React from "react";
import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { withTranslation } from "react-i18next";
import "./Header.css";

class Header extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  resizeHandler() {
    const height = this.header.clientHeight;
    this.setState({ height });
    this.props.onHeightChange(height);
  }

  componentDidMount() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  logoutHandler = () => {
    this.context.logout();
  };

  render() {
    let { isLoggedIn, name } = this.context;
    console.log("Context :", this.context);

    return (
      <Container
        fluid
        className="fixed-top border-bottom text-center bg-white boxShadow"
        style={{ paddingLeft: 0, paddingRight: 0 }}
        ref={(header) => {
          this.header = header;
        }}
      >
        <Navbar bg="white" expand="sm">
          <Container fluid>
            <Navbar.Brand to="/" as={NavLink}>
              Home
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search Blog By Category"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>

              {isLoggedIn && (
                <Nav className="d-flex w-100 " style={{ paddingLeft: "20px" }}>
                  <Link
                    className="me-auto button btn btn-outline-secondary ms-1 my-2 text-decoration-none"
                    to="/new-post"
                    as={NavLink}
                  >
                    New Blog
                  </Link>
                  <div
                    className="btn align-self-center text-secondary"
                    style={{ cursor: "default" }}
                  >
                    <span>{` Signed As:  ${name}`}</span>
                  </div>
                  <Link
                    className="button btn btn-outline-secondary me-1 my-2 text-decoration-none"
                    to="/"
                    as={NavLink}
                    onClick={this.logoutHandler}
                  >
                    Logout
                  </Link>
                </Nav>
              )}

              {!isLoggedIn && (
                <Nav className="d-flex w-100 justify-content-end">
                  <Link
                    className="button btn btn-outline-primary me-1 my-1 text-decoration-none"
                    to="/login"
                    as={NavLink}
                  >
                    Login
                  </Link>
                  <Link
                    className="button btn btn-outline-primary me-1 my-1 text-decoration-none"
                    to="/register"
                    as={NavLink}
                  >
                    Register
                  </Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    );
  }
}

export default withTranslation()(Header);
