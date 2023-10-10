import React from "react";
import { Col } from "react-bootstrap";

const Banner = ({ message, className }) => {
  return (
    <Col sm={12} md={12} lg={12} className="align-self-center">
      <div
        className={`p-4 text-center border rounded-3 boxShadow ${className}`}
      >
        {message}
      </div>
    </Col>
  );
};

export default Banner;
