import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { deletePost } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import SubmitButton from "../SubmitButton";

const ShowBlogs = ({ post, setIsPostDeleted }) => {
  const [isSubmitDissable, setIsSubmitDissable] = useState(false);
  const location = useLocation();
  const { isLoggedIn, username, authorities, user, ROLES } =
    useContext(AuthContext);

  const deletePostHandler = async () => {
    try {
      await deletePost(post.id);
      setIsPostDeleted(true);
    } catch (e) {
      console.log(e);
    }
  };

  const isButtonDissable = () => {
    const flag =
      user?.authority === ROLES.admin ||
      (user.length > 0 && user?.username === post.blogUser?.username);
    setIsSubmitDissable(flag);
    console.log("user", user);
    console.log("Roles :", ROLES);
    console.log("post :", post);
    console.log("Flag: ", flag);
  };

  useEffect(() => {
    isButtonDissable();
  }, [post]);

  return (
    <Card className="boxShadow">
      <Card.Header className="fst-italic">
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
              isDisabled={!isSubmitDissable}
            />
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ShowBlogs;
