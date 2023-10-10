import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import RegistrationForm from "../Components/Forms/RegistrationForm";

const RegisterPage = (props) => {
  return (
    <Container>
      <Row
        className="py-4 d-flex flex-column align-content-center"
        style={{
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        <RegistrationForm />
      </Row>
    </Container>
  );
};

export default RegisterPage;
