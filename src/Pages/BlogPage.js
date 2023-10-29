import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ShowBlogs from "../Components/Forms/ShowBlogs";
import Loading from "../Components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import Banner from "../Components/Banner";
import BlogContext from "../store/blog-context";
import { getUserById } from "../lib/api";
import AuthContext from "../store/auth-context";
import { logger } from "../Components/utils/Logger";

const BlogPage = (props) => {
  const [post, setPost] = useState({});
  const [isPostDeleted, setIsPostDeleted] = useState(false);
  const { error, findBlogById, isLoading, deleteBlog } =
    useContext(BlogContext);
  const { token } = useContext(AuthContext);

  //const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPostById = () => {
    const response = findBlogById(id);
    response
      .then((data) => {
        logger.log("featching user datails", data.data);
        setPost(data.data);
      })
      .catch((err) =>
        logger.error("Error occured while featching blogs details ", err)
      );
  };

  const deletePostByIdHandler = (id) => {
    const response = deleteBlog(id);
    response.then((data) => {
      setIsPostDeleted(true);
    });
  };

  useEffect(() => {
    if (isPostDeleted) {
      setTimeout(() => {
        setIsPostDeleted(false);
        navigate("/");
      }, 2000);
    }
  }, [isPostDeleted]);

  useEffect(() => {
    fetchPostById();
    console.log("userEffect triggered :");
  }, []);

  let content = <Loading />;

  if (error) {
    content = <Banner className="text-danger border-danger" message={error} />;
  }
  if (isPostDeleted) {
    content = (
      <Banner
        className="text-danger border-danger mt-4"
        message={"Post Deleted Successfully ..."}
      />
    );
  }
  if (!isLoading && !error && !isPostDeleted) {
    content = (
      <Col className="d-flex flex-column justify-content-center">
        <ShowBlogs post={post} deletePostByIdHandler={deletePostByIdHandler} />
      </Col>
    );
  }

  return (
    <Container>
      <Row className="pt-4 d-flex justify-content-center">{content}</Row>
    </Container>
  );
};

export default BlogPage;
