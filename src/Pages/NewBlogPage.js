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

  const onSubmit = (newPost, formikHelpers) => {
    // console.log(newPost);
    submitNewPost(newPost, authContext.token)
      .then((post) => {
        // console.log(post);
        setTimeout(() => {
          setNewPostId(post.id);
          setIsSubmitted(true);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          formikHelpers.setSubmitting(false);
        }, 2000);
      });
  };

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
        <NewBlogForm isSubmitted={isSubmitted} onSubmit={onSubmit} />
        {isSubmitted && (
          <Banner
            className="text-success border-success mt-4"
            message={`${t("addedBy", { type: "post" })} ${
              authContext.userName
            }`}
          />
        )}
      </Row>
    </Container>
  );
};

export default NewBlogPage;
