import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import NewBlogForm from "../Components/Forms/NewBlogForm";
import { submitNewPost } from "../lib/api";
import AuthContext from "../store/auth-context";
import Banner from "../Components/Banner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewBlogPage = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newPostId, setNewPostId] = useState(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          marginTop: props.headerHeight,
          marginBottom: props.footerHeight,
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
