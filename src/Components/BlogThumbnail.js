import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const BlogThumbnail = (props) => {
  const { t } = useTranslation();

  return (
    <Link
      to={"/post/" + props.post.id}
      as={NavLink}
      className="thumbnail text-decoration-none text-black"
    >
      <Card className="h-100 boxShadow">
        <Card.Header className="fst-italic">
          {props.post.blogUser?.name}
        </Card.Header>
        <Card.Body>
          <Card.Title className="fst-italic">{props.post.category}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.post.article.slice(0, 200) + " . . ."}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex text-muted">
          <div className="me-auto">{`${t("posted")}: ${
            props.post.createdOn
          }`}</div>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogThumbnail;
