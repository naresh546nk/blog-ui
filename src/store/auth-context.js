import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { getUserByUsername, saveUser } from "../lib/api";

const AuthContext = React.createContext({
  name: "",
  username: "",
  authorities: "",
  token: "",
  isLoggedIn: false,
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
  const [isLocalDataSet, setIsLocalDataSet] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(localStorage.getItem("username"));
    setName(localStorage.getItem("name"));
    setAuthority(localStorage.getItem("authority"));
    setUserIsLoggedIn(localStorage.getItem("userIsLoggedIn"));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  useEffect(() => {
    if (isLocalDataSet) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("name", name);
      localStorage.setItem("authority", authority);
      localStorage.setItem("isLoggedIn", userIsLoggedIn);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userIsLoggedIn", userIsLoggedIn);
      setIsLocalDataSet(false);
    }
  }, [isLocalDataSet]);

  useEffect(() => {
    if (userIsLoggedIn) {
      getUserHandler({ username, token });
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [userIsLoggedIn]);

  //To remove the error after 10second
  useEffect(() => {
    if (error === "null") {
      setError(null);
    }
    if (error !== null) {
      const timmer = setTimeout(() => {
        setError(null);
      }, 10000);
      return () => clearTimeout(timmer);
    }
  }, [error]);

  //To expire the token after 1hr

  useEffect(() => {
    if (userIsLoggedIn) {
      const timmer = setTimeout(() => {
        console.log("Token expire");
        logoutHandler();
      }, 3600000);
      return () => clearTimeout(timmer);
    }
  }, [userIsLoggedIn]);

  const loginHandler = async (props) => {
    setError(null);
    const { username, password } = props;
    try {
      const data = await Auth.signIn(username, password);
      const { signInUserSession } = data;
      setUsername(username);
      setToken(signInUserSession.accessToken.jwtToken);
      setName(data.attributes.name);
      setUserIsLoggedIn(true);
      setIsLocalDataSet(true);
      return data;
    } catch (e) {
      console.log(e);
      setError(e.message);
      throw e;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("authority");
    localStorage.removeItem("userIsLoggedIn");
    localStorage.removeItem("user");
    setToken(null);
    setError(null);
    setUsername(null);
    setAuthority(null);
    setToken(null);
    setUserIsLoggedIn(false);
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
      const data = await Auth.confirmSignUp(username, code);
      setError("");
      console.log("data", data);
      return data;
    } catch (e) {
      setError(e.message);
      throw e;
    }
  };

  const addUserToDbHandler = (props) => {
    const response = saveUser(props);
    response
      .then((data) => {
        console.log(data.data);
        setUser(user);
      })
      .catch((err) => setError(err.message));
    return response;
  };

  const getUserHandler = ({ username, token }) => {
    const response = getUserByUsername({ username, token });
    response.then((data) => {
      setUser(data.data);
      return data.data;
    });
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

  console.log("contextValue", contextValue);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
