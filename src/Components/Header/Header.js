import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./Header.css";
import BlogContext from "../../store/blog-context";

const Header = (props) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { blogCategories, filterByCategory, getAllBlogs } =
    useContext(BlogContext);
  const [category, setCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (isLoggedIn) {
      getAllBlogs();
    }
  };

  useEffect(() => {
    props.onHeightChange(70);
    console.log("blogCategory ", blogCategories);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, [category]);

  const logoutHandler = () => {
    logout();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    filterByCategory(category);
  };

  return (
    <Container
      fluid
      className="fixed-top border-bottom text-center bg-white boxShadow"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Navbar bg="white" expand="sm">
        <Container fluid>
          <Navbar.Brand to="/" as={NavLink} onClick={onClickHandler}>
            <div className="navbarBrand">BLOG SITE</div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex w-100">
              <Form className="d-flex w-100">
                <Form.Control
                  type="search"
                  placeholder="Search Blog By Category"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setCategory(e.target.value)}
                  list="blogCategoriesListId"
                />
                <datalist id="blogCategoriesListId">
                  {blogCategories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
                <Button
                  variant="outline-success button btn"
                  onClick={submitHandler}
                >
                  Search
                </Button>
              </Form>
            </div>

            {isLoggedIn && (
              <Nav className="d-flex w-100 justify-content-end">
                <Link
                  className="button btn btn-outline-primary me-1 my-1 text-decoration-none"
                  to="/new-post"
                  as={NavLink}
                >
                  New Blog
                </Link>

                <Link
                  className="button btn btn-outline-primary me-1 my-1 text-decoration-none"
                  to="/"
                  as={NavLink}
                  onClick={logoutHandler}
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
};

export default Header;
