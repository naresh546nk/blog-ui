import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import NewBlogForm from "../Components/Forms/NewBlogForm";
import Banner from "../Components/Banner";
import { useNavigate } from "react-router-dom";

const NewBlogPage = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newPostId, setNewPostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (isSubmitted) {
        setIsSubmitted(false);
        navigate(`/post/${newPostId}`);
      }
    }, 2000);
  }, [isSubmitted]);

  return (
    <Container>
      <Row
        className="py-4 d-flex flex-column justify-content-center"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <NewBlogForm
          setIsSubmitted={setIsSubmitted}
          setNewPostId={setNewPostId}
        />
        {isSubmitted && (
          <Banner
            className="text-success border-success mt-4"
            message={"Post Added Successfully .. "}
          />
        )}
      </Row>
    </Container>
  );
};

export default NewBlogPage;
