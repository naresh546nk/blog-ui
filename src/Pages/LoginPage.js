import React, { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { login } from "../lib/api";
import LoginForm from "../Components/Forms/LoginForm";
import AuthContext from "../store/auth-context";
import Banner from "../Components/Banner";
import RegistrationForm from "../Components/Forms/RegistrationForm";

const LoginPage = (props) => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const authCtx = useContext(AuthContext);

  return (
    <Container className="align-content-center">
      <Row
        className="py-4 d-flex flex-column"
        style={{
          marginTop: props.headerHeight,
          marginBottom: props.footerHeight,
          marginLeft: "20%",
        }}
      >
        <LoginForm />
      </Row>
    </Container>
  );
};

export default LoginPage;
