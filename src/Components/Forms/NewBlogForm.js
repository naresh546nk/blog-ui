import React, { useContext, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import SubmitButton from "../SubmitButton";
import AuthContext from "../../store/auth-context";
import { useState } from "react";
import { submitNewBlog } from "../../lib/api";

const NewBlogForm = ({ setIsSubmitted, setNewPostId }) => {
  const { user, token } = useContext(AuthContext);
  const [blogName, setBlogName] = useState("");
  const [category, setCategory] = useState("");
  const [article, setArticle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isValidArticle, setIsValidArticle] = useState(false);
  const submitHanlder = (e) => {
    e.preventDefault();
    const post = {
      blogName,
      category,
      article,
      authorName,
      blogUser: user,
    };
    console.log("Adding post : ", post);
    const response = submitNewBlog({ post, token });
    response
      .then((data) => {
        setIsSubmitted(true);
        setNewPostId(data.data.id);
        console.log("Data :", data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validateArticle = () => {
    const articleList = article.split(" ");
    articleList.length > 100
      ? setIsValidArticle(true)
      : setIsValidArticle(false);
  };

  useEffect(() => {
    validateArticle();
  }, [article]);
  return (
    <Col>
      <Card className="boxShadow">
        <Card.Header className="fst-italic">
          <Form.Group controlId="authorName">
            <Form.Label>Author :</Form.Label>
            <Form.Control
              type="text"
              placeholder={"Author"}
              name="authorName"
              onChange={(e) => setAuthorName(e.target.value)}
              height="600px"
              minLength={4}
              maxLength={25}
              required
              isValid={authorName.length >= 4 && authorName.length <= 25}
            />
          </Form.Group>
        </Card.Header>
        <Card.Body className="m-2 pb-3 border rounded-3">
          <Form onSubmit={submitHanlder}>
            <Row>
              <Col md={6} sm={12}>
                <Form.Group controlId="blogName">
                  <Form.Label>Blog Name :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={"Blog Name"}
                    name="blogName"
                    onChange={(e) => setBlogName(e.target.value)}
                    minLength={6}
                    maxLength={40}
                    required
                    isValid={blogName.length >= 6 && blogName.length <= 40}
                  />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group controlId="category">
                  <Form.Label>Category :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={"Enter Category here .."}
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    minLength={4}
                    maxLength={40}
                    required
                    isValid={category.length >= 6 && category.length <= 40}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="my-2" controlId="article">
              <Form.Label>Article</Form.Label>
              <Form.Control
                type="text"
                name="article"
                as="textarea"
                style={{ overflow: "hidden", height: "40vh" }}
                onChange={(e) => setArticle(e.target.value)}
                minLength={400}
                maxLength={10000}
                isValid={isValidArticle}
                required
              />
            </Form.Group>
            <div className="d-flex justify-article-end">
              <SubmitButton
                isDisabled={
                  !isValidArticle ||
                  !(category.length >= 6 && category.length <= 40) ||
                  !(blogName.length >= 6 && blogName.length <= 40) ||
                  !(authorName.length >= 4 && authorName.length <= 25)
                }
                type="submit"
                name={"Add New Blog"}
              />
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NewBlogForm;
