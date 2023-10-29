import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getUserById } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import SubmitButton from "../SubmitButton";
import { logger } from "../utils/Logger";

const ShowBlogs = ({ post, deletePostByIdHandler }) => {
  const [isSubmitDissable, setIsSubmitDissable] = useState(false);
  const [userDto, setUserDto] = useState();
  const { user, ROLES, token } = useContext(AuthContext);

  const findUserById = (id) => {
    const response = getUserById({ id, token });
    response
      .then((data) => {
        logger.log("featching user details :", data.data);
        setUserDto(data.data);
      })
      .catch((err) =>
        logger.error("error occured while featching user details :", err)
      );
  };

  const isButtonDissable = () => {
    const flag =
      user?.authority === ROLES.admin || user?.username === userDto?.username;
    setIsSubmitDissable(flag);
  };

  useEffect(() => {
    if (!!post?.userDto?.id) {
      findUserById(post?.userDto?.id);
    }
  }, [post?.userDto?.id]);

  useEffect(() => {
    isButtonDissable();
  }, [post, userDto]);

  return (
    <Card
      className="boxShadow"
      style={{ marginTop: "35px", marginBottom: "40px" }}
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
