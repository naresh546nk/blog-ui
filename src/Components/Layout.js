import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import BlogContext from "../store/blog-context";
import Pages from "../Pages/Pages";
import { useNavigate } from "react-router";
import Moment from "moment";

const Layout = ({ headerHeight, footerHeight }) => {
  const [width, setWidth] = useState(1000);
  const {
    getAllBlogs,
    showYourBlogs,
    showOthersBlogs,
    myBlogsCounts,
    othersBlogsCounts,
    findBlogsByCategoryAndDateRange,
    blogCategories,
  } = useContext(BlogContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [changeInputTypeForStartDate, setChangeInputTypeForStartDate] =
    useState(false);
  const [changeInputTypeForEndDate, setChangeInputTypeForEndDate] =
    useState(false);

  const useScreenSize = () => {
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  };
  useScreenSize();

  useEffect(() => {
    navigate("/");
  }, [changeInputTypeForStartDate]);

  const showYourBlogsHandler = () => {
    showYourBlogs();
    navigate("/");
  };
  const showOthersBlogsHandler = () => {
    showOthersBlogs();
    navigate("/");
  };
  const getAllBlogsHandler = () => {
    getAllBlogs();
    navigate("/");
  };

  const categoryOnChangeHandler = (e) => {
    setCategory(e.target.value);
  };
  const startDateOnChangeHandler = (e) => {
    setStartDate(e.target.value);
  };
  const endDateOnChangeHandler = (e) => {
    setEndDate(e.target.value);
  };

  const searchHandler = () => {
    const formatedStartDate = Moment(startDate).format("YYYY-MM-DD");
    const formatedEndDate = Moment(endDate).format("YYYY-MM-DD");
    const parms = {
      category,
      startDate: formatedStartDate,
      endDate: formatedEndDate,
    };
    findBlogsByCategoryAndDateRange(parms);
  };

  return (
    <Container>
      <Row
        className="justify-content-center"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Col
          lg={2}
          md={3}
          sm={3}
          className={width > 575 ? "fixed-top fixed" : "fixed m5"}
        >
          <div className="d-flex flex-column w-100">
            <Button
              disabled={!isLoggedIn || myBlogsCounts <= 0}
              className="m-2"
              onClick={showYourBlogsHandler}
            >
              You Blogs( <span>{myBlogsCounts}</span>)
            </Button>
            <Button
              disabled={!isLoggedIn || othersBlogsCounts <= 0}
              className="m-2"
              onClick={showOthersBlogsHandler}
            >
              Other Blogs (<span>{othersBlogsCounts}</span>)
            </Button>
            <Button
              disabled={!isLoggedIn}
              className="m-2"
              onClick={getAllBlogsHandler}
            >
              All Blogs (
              <span>
                {myBlogsCounts} + {othersBlogsCounts}
              </span>
              )
            </Button>
            <Form.Group className="m-2">
              <Form.Label>
                <b>Search blogs</b>
              </Form.Label>
              <Form.Control
                type="search"
                placeholder="Category "
                className="me-2"
                aria-label="Search"
                onChange={categoryOnChangeHandler}
                list="blogCategoriesListId"
              />
              <datalist id="blogCategoriesListId">
                {blogCategories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
              <Form.Control
                style={{ marginTop: "5px" }}
                placeholder="From"
                type={changeInputTypeForStartDate ? "date" : "text"}
                onFocus={() => setChangeInputTypeForStartDate(true)}
                onBlur={() => setChangeInputTypeForStartDate(false)}
                onChange={startDateOnChangeHandler}
              />
              <Form.Control
                style={{ marginTop: "5px" }}
                type={changeInputTypeForEndDate ? "date" : "text"}
                onFocus={() => setChangeInputTypeForEndDate(true)}
                onBlur={() => setChangeInputTypeForEndDate(false)}
                placeholder="To"
                onChange={endDateOnChangeHandler}
              />
              <Button
                disabled={!isLoggedIn || !category || !startDate || !endDate}
                onClick={searchHandler}
                type="button"
                className="btn w-100 mt-2"
              >
                Search{" "}
              </Button>
            </Form.Group>
          </div>
        </Col>
        <Col sm={{ span: 9, offset: 3 }} className="d-flex flex-column w-95">
          <Pages headerHeight={headerHeight} footerHeight={footerHeight} />{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
