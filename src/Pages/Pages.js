import React, { useContext } from "react";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import NewBlogPage from "./NewBlogPage";
import BlogPage from "./BlogPage";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Pages = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      {!authCtx.isLoggedIn && (
        <Route
          path="/login"
          element={
            <LoginPage
              headerHeight={props.headerHeight}
              footerHeight={props.footerHeight}
            />
          }
        ></Route>
      )}
      {!authCtx.isLoggedIn && (
        <Route
          path="/register"
          element={
            <RegisterPage
              headerHeight={props.headerHeight}
              footerHeight={props.footerHeight}
            />
          }
        ></Route>
      )}
      <Route
        path="/new-post"
        element={
          authCtx.isLoggedIn ? (
            <NewBlogPage
              headerHeight={props.headerHeight}
              footerHeight={props.footerHeight}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      ></Route>
      <Route
        path="/post/:id"
        element={
          <BlogPage
            headerHeight={props.headerHeight}
            footerHeight={props.footerHeight}
          />
        }
      ></Route>
      <Route
        path="/"
        element={
          <MainPage
            headerHeight={props.headerHeight}
            footerHeight={props.footerHeight}
          />
        }
      ></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default Pages;
