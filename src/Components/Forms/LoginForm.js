import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Banner from "../Banner";
import SubmitButton from "../SubmitButton";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLognSuccess, setIsLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const { error } = useContext(AuthContext);

  const { login } = useContext(AuthContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const { user } = await login({ username, password });
      console.log(user);
      setIsLoginSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isLognSuccess) {
      navigate("/");
    }
  }, [isLognSuccess]);

  return (
    <div>
      <Col sm={10} md={7} lg={7}>
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
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <SubmitButton name="Login" />
          </Form>
        </Card>
        {error && (
          <Banner className="text-danger border-success mt-4" message={error} />
        )}
      </Col>
    </div>
  );
};
export default LoginForm;
