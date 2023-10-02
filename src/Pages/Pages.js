import React, { useContext } from "react";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import NewBlogPage from "./NewBlogPage";
import BlogPage from "./BlogPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Pages = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>

      <Route path="/register" element={<RegisterPage />}></Route>

      <Route path="/new-post" element={<NewBlogPage />}></Route>
      <Route path="/post/:id" element={<BlogPage />}></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default Pages;
