import React, { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import LoginForm from "../Components/Forms/LoginForm";

const LoginPage = (props) => {
  return (
    <Container>
      <Row
        className="py-4 d-flex flex-column align-content-center"
        style={{
          marginTop: props.headerHeight,
          marginBottom: props.footerHeight,
        }}
      >
        <LoginForm />
      </Row>
    </Container>
  );
};

export default LoginPage;
