import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { getUserByUsername, saveUser } from "../lib/api";

const AuthContext = React.createContext({
  name: "naresh",
  username: "naresh@gmail.com",
  authorities: "",
  token: "",
  isLoggedIn: true,
  user: {},
  ROLES: {},
  signUp: (props) => {},
  confirmSignUp: (props) => {},
  login: (props) => {},
  logout: () => {},
  addUserToDb: (props) => {},
  getUser: (username) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [authorities, setAuthorities] = useState(
    sessionStorage.getItem("authorities")
  );

  const userIsLoggedIn = !!token;

  const loginHandler = async (props) => {
    setError(null);
    const { username, password } = props;
    try {
      const data = await Auth.signIn(username, password);
      getUserHandler({ username });
      const { signInUserSession } = data;
      setUsername(username);
      setToken(signInUserSession.accessToken.jwtToken);
      setName(data.attributes.name);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("user", user);

      return data;
    } catch (e) {
      console.log(e);
      setError(e.message);
      throw e;
    }
  };

  const logoutHandler = () => {
    setError(null);
    setUsername(null);
    setAuthorities(null);
    setToken(null);
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("authorities");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("token");
  };

  const signUpHandler = async (props) => {
    setError(null);
    const { username, name, password } = props;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          name,
        },
      });
      setUser(user);
      setError("");
      return user;
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  const confirmSignUpHandler = async (props) => {
    setError(null);
    const { username, code } = props;
    console.log("Props :", props);
    try {
      await Auth.confirmSignUp(username, code);
      setError("");
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  const addUserToDbHandler = async (props) => {
    try {
      const { user } = await saveUser(props);
      setUser(user);
      console.log(user);
      return user;
    } catch (e) {
      throw e;
    }
  };

  const getUserHandler = async ({ username }) => {
    try {
      const data = await getUserByUsername(username);
      setUser(data);
      console.log("#userData", data);
      return user;
    } catch (e) {
      console.log("Error : ", e);
      throw e;
    }
  };

  const contextValue = {
    error: error,
    username: username,
    authorities: authorities,
    token: token,
    isLoggedIn: userIsLoggedIn,
    name: name,
    user: user,
    ROLES: {
      admin: "ADMIN",
      user: "USER",
    },
    login: loginHandler,
    logout: logoutHandler,
    signUp: signUpHandler,
    confirmSignUp: confirmSignUpHandler,
    addUserToDb: addUserToDbHandler,
    getUser: getUserHandler,
  };

  useEffect(() => {
    console.log("##User ", user);
    console.log("##Error ", error);
  }, [user, error]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
