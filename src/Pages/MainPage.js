import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BlogThumbnailsList from "../Components/BlogThumbnailsList";
import Loading from "../Components/Loading";
import AuthContext from "../store/auth-context";
import BlogContext from "../store/blog-context";

const MainPage = (props) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const { getAllBlogs, getAllCategories, blogList, isLoading } =
    useContext(BlogContext);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("calling getAllBlogs");
      getAllBlogs();
      getAllCategories();
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (!isLoading) {
      setIsLoaded(false);
    }
  }, [isLoading]);

  return (
    <Container>
      <Row
        xs={1}
        md={2}
        lg={3}
        className="g-4 pb-4 justify-content-center"
        style={{
          marginTop: "60px",
          marginBottom: "60px",
        }}
      >
        {isLoading ? <Loading /> : <BlogThumbnailsList posts={blogList} />}
      </Row>
    </Container>
  );
};

export default MainPage;
