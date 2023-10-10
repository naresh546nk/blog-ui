import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import SubmitButton from "../SubmitButton";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoggedIn } = useContext(AuthContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    login({ username, password });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Card className="roundedBorder boxShadow">
      <Card.Header className="fst-italic">Login Form</Card.Header>
      <Form className="m-2 p-4 border rounded-3" onSubmit={loginHandler}>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email as Username"
            name="userName"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            maxLength={20}
            minLength={8}
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="on"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <SubmitButton name="Login" />
      </Form>
    </Card>
  );
};
export default LoginForm;
