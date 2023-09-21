import React, { useContext, useEffect, useRef } from "react";
import { Card, Form } from "react-bootstrap";
import { deletePost } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import SubmitButton from "../SubmitButton";

const BlogUpdateForm = ({ post, setIsPostDeleted }) => {
  const { isLoggedIn, username, authorities } = useContext(AuthContext);

  const deletePostHandler = async () => {
    try {
      await deletePost(post.id);
      setIsPostDeleted(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {}, []);

  return (
    <Card className="boxShadow">
      <Card.Header className="fst-italic">
        {" "}
        Author : {post.authorName}
      </Card.Header>
      <Card.Body>
        <Card.Title className="fst-italic">{post.blogName}</Card.Title>
        <Card.Text className="fst-italic">{post.article}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex text-muted">
        <div className="me-auto">{`Posted: ${post.createdOn}`}</div>
        <div>
          <div className="d-flex justify-article-end">
            <SubmitButton
              variant="outline-danger"
              type="button"
              onClick={deletePostHandler}
              name="Delete"
            />
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default BlogUpdateForm;
