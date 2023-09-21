import React, { useContext, useEffect, useRef } from "react";
import { Card, Col, Form } from "react-bootstrap";
import SubmitButton from "../SubmitButton";
import AuthContext from "../../store/auth-context";
import { useState } from "react";
import { submitNewPost } from "../../lib/api";

const NewBlogForm = ({ setIsSubmitted, setNewPostId }) => {
  const { user } = useContext(AuthContext);
  const [blogName, setBlogName] = useState("");
  const [category, setCategory] = useState("");
  const [article, setArticle] = useState("");
  const [authorName, setAuthorName] = useState("");

  const submitHanlder = async (e) => {
    e.preventDefault();
    const post = {
      blogName,
      category,
      article,
      authorName,
      user,
    };
    console.log("Adding post : ", post);
    try {
      const data = await submitNewPost(post);
      setIsSubmitted(true);
      setNewPostId(data.id);
      console.log("Data :", data);
    } catch (e) {
      console.log("error : ", e);
    }
  };

  useEffect(() => {});
  return (
    <Col>
      <Card className="boxShadow">
        <Card.Header className="fst-italic">
          <Form.Group controlId="authorName">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder={"Author Name"}
              name="authorName"
              onChange={(e) => setAuthorName(e.target.value)}
              height="600px"
            />
          </Form.Group>
        </Card.Header>
        <Card.Body className="m-2 pb-3 border rounded-3">
          <Form onSubmit={submitHanlder}>
            <Form.Group controlId="blogName">
              <Form.Label>Blog Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={"Blog Name"}
                name="blogName"
                onChange={(e) => setBlogName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder={"Enter Category here .."}
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="article">
              <Form.Label>Article</Form.Label>
              <Form.Control
                type="text"
                name="article"
                as="textarea"
                style={{ overflow: "hidden", height: "500px" }}
                onChange={(e) => setArticle(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-article-end">
              <SubmitButton type="submit" name={"Add New Blog"} />
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NewBlogForm;
