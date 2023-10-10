import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Banner from "../Banner";
import SubmitButton from "../SubmitButton";

const RegistrationForm = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [isShowCode, setIsShowCode] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  const { signUp, confirmSignUp, error, addUserToDb, login } =
    useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submited ", name, username, password, confirmPassword);
    try {
      const data = await signUp({ username, password, name });
      setIsShowCode(true);
      console.log("data :", data);
    } catch (e) {
      setIsShowCode(false);
    }
  };

  const confirmCodeHandler = async (e) => {
    e.preventDefault();
    console.log("code ", code);
    try {
      const data = await confirmSignUp({
        username,
        code,
      });
      if (data === "SUCCESS") {
        const response = addUserToDb({ name, username });
        response
          .then((data) => {
            if (data?.data) {
              console.log("data :", data);
              setIsSignUpSuccess(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isSignUpSuccess) {
      login({ username, password });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isSignUpSuccess]);

  return (
    <Col sm={10} md={8} lg={6}>
      <Card className="roundedBorder boxShadow">
        <Card.Header className="fst-italic">Registration Form :</Card.Header>

        {!isShowCode && (
          <Form className="m-2 p-4 border rounded-3" onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
                minLength={8}
                maxLength={25}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="email "
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                maxLength={20}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newpassword">
              <Form.Label>Confirm Password </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="newpassword"
                autoComplete="on"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                isValid={
                  password === confirmPassword &&
                  password !== "" &&
                  password.length >= 8
                }
              />
            </Form.Group>

            <SubmitButton name="Register" />
          </Form>
        )}

        {isShowCode && (
          <Form
            className="m-2 p-4 border rounded-3"
            onSubmit={confirmCodeHandler}
          >
            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Confirmation Code </Form.Label>
              <Form.Control
                type="text"
                placeholder="Confirmation code"
                name="code"
                onChange={(e) => setCode(e.target.value)}
                required
                minLength={6}
                maxLength={8}
              />
            </Form.Group>

            <SubmitButton name="Confirm Code" />
          </Form>
        )}
      </Card>
      {error && (
        <Banner className="text-danger border-success mt-4" message={error} />
      )}
    </Col>
  );
};

export default RegistrationForm;
