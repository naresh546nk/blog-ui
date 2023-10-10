import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Banner from "../Components/Banner";
import LoginForm from "../Components/Forms/LoginForm";
import AuthContext from "../store/auth-context";

const LoginPage = (props) => {
  const { error } = useContext(AuthContext);
  return (
    <Container>
      <Row
        className="py-4 d-flex flex-column align-content-center"
        style={{
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        <Col sm={10} md={8} lg={6}>
          <LoginForm />
          {error !== "" && error !== null && (
            <Banner
              className="text-danger border-success mt-4"
              message={error}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
