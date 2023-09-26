import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { getUserByUsername, saveUser } from "../lib/api";

const AuthContext = React.createContext({
  name: "",
  username: "",
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
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [authority, setAuthority] = useState();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }
    if (localStorage.getItem("name")) {
      setName(localStorage.getItem("name"));
    }
    if (localStorage.getItem("error")) {
      setError(localStorage.getItem("error"));
    }
    if (localStorage.getItem("authority")) {
      setAuthority(localStorage.getItem("authority"));
    }
    if (localStorage.getItem("userIsLoggedIn")) {
      setAuthority(localStorage.getItem("userIsLoggedIn"));
    }
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("name", name);
    localStorage.setItem("error", error);
    localStorage.setItem("authority", authority);
    localStorage.setItem("userIsLoggedIn", userIsLoggedIn);
    localStorage.setItem("user", JSON.stringify(user));
  }, [userIsLoggedIn]);

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
      setUserIsLoggedIn(true);
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
    setAuthority(null);
    setToken(null);
    userIsLoggedIn(false);
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
    authority: authority,
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
