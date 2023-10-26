import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

const BlogThumbnail = (props) => {
  return (
    <Link
      to={"/post/" + props.post.id}
      as={NavLink}
      className="text-decoration-none text-black d-flex"
    >
      <Card className="boxShadow">
        <Card.Header className="fst-italic">
          {props.post.category}
        </Card.Header>
        <Card.Body>
          <Card.Title className="fst-italic">{props.post.blogName}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.post.article.slice(0, 300) + " . . ."}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex text-muted">
          <div className="me-auto">{`posted : ${props.post.createdOn}`}</div>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogThumbnail;
