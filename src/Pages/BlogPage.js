import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ShowBlogs from "../Components/Forms/ShowBlogs";
import Loading from "../Components/Loading";
import { getPostById } from "../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import Banner from "../Components/Banner";

const BlogPage = (props) => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPostById = () => {
    setIsLoading(true);
    getPostById(id)
      .then((post) => {
        setPost(post);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isPostDeleted) {
      setIsPostDeleted(false);
      navigate("/");
    }
  }, [isPostDeleted]);

  useEffect(() => {
    fetchPostById();
  }, []);

  let content = <Loading />;

  if (error) {
    content = <Banner className="text-danger border-danger" message={error} />;
  }
  if (!isLoading && !error) {
    content = (
      <Col className="d-flex flex-column justify-content-center">
        <ShowBlogs post={post} setIsPostDeleted={setIsPostDeleted} />
        {isPostDeleted && (
          <Banner
            className="text-danger border-danger mt-4"
            message={"Post Deleted Successfully ..."}
          />
        )}
      </Col>
    );
  }

  return (
    <Container>
      <Row
        className="pt-4 d-flex justify-content-center"
        style={{
          marginTop: props.headerHeight,
          marginBottom: props.footerHeight,
        }}
      >
        {content}
      </Row>
    </Container>
  );
};

export default BlogPage;
