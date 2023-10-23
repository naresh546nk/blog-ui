import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import BlogContext from "../../store/blog-context";
import SubmitButton from "../SubmitButton";

const ShowBlogs = ({ post, deletePostByIdHandler }) => {
  const [isSubmitDissable, setIsSubmitDissable] = useState(false);
  const { user, ROLES } = useContext(AuthContext);
  const { deleteBlog } = useContext(BlogContext);

  const isButtonDissable = () => {
    console.log("user :", user);
    console.log("Roles : ", ROLES)
    const flag =
      user ?.authority === ROLES.admin ||
        user ?.username === post.userDto ?.username;
    setIsSubmitDissable(flag);
  };

  useEffect(() => {
    isButtonDissable();
  }, [post]);

  return (
    <Card
      className="boxShadow"
      style={{ marginTop: '35px', marginBottom: "40px" }}
    >
      <Card.Header className="fst-italic d-flex justify-content-between">
        <div>
          Author : <b>{post.authorName}</b>
        </div>
        <div>
          Category : <b>{post.category}</b>
        </div>

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
              onClick={() => deletePostByIdHandler(post.id)}
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
