import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import BlogThumbnailsList from "../Components/BlogThumbnailsList";
import Loading from "../Components/Loading";
import AuthContext from "../store/auth-context";
import BlogContext from "../store/blog-context";


const MainPage = () => {
  const { blogList, isLoading, getAllBlogs, getAllCategories, error } =
    useContext(BlogContext);

  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    if (isLoggedIn) {
      getAllBlogs();
      getAllCategories();
    }
  }, [isLoggedIn]);
  return (
    <Container>
      <Row
        xs={12}
        md={12}
        lg={12}
        style={{
          marginTop: "50px",
          marginBottom: "40px",
        }}
      >
        <Col md={12}>
          {isLoading ? <Loading /> : <BlogThumbnailsList posts={blogList} />}
        </Col>

      </Row>
    </Container>
  );
};

export default MainPage;
