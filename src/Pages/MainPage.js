import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BlogThumbnailsList from "../Components/BlogThumbnailsList";
import Loading from "../Components/Loading";
import BlogContext from "../store/blog-context";

const MainPage = (props) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const { getAllBlogs, getAllCategories, blogList, isLoading } =
    useContext(BlogContext);

  useEffect(() => {
    getAllBlogs();
    getAllCategories();
  }, []);
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
          marginTop: props.headerHeight,
          marginBottom: props.footerHeight,
        }}
      >
        {isLoading ? <Loading /> : <BlogThumbnailsList posts={blogList} />}
      </Row>
    </Container>
  );
};

export default MainPage;
