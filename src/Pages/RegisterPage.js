import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import RegistrationForm from "../Components/Forms/RegistrationForm";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const RegisterPage = (props) => {
  const { signUp, confirmCode } = useContext(AuthContext);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (isRegistrationSuccess) {
        setIsRegistrationSuccess(false);
        navigate("/login");
      }
    }, 2000);
  }, [isRegistrationSuccess]);

  const onSubmit = async (values, formikHelpers) => {
    console.log("value :", values);
  };
  return (
    <Container>
      <Row
        className="py-4 d-flex flex-column align-content-center"
        style={{
          marginTop: props.headerHeight,
          marginBottom: props.footerHeight,
        }}
      >
        <RegistrationForm />
      </Row>
    </Container>
  );
};

export default RegisterPage;
