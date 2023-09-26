import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./store/auth-context";
import { Amplify } from "aws-amplify";
import { BlogContextProvider } from "./store/blog-context";
const root = ReactDOM.createRoot(document.getElementById("root"));

Amplify.configure({
  Auth: {
    userPoolId: "us-east-1_3PQhzGhke",
    region: "ap-south-1",
    userPoolWebClientId: "7quscff33ekhb1vprkdjjslod3",
  },
});

root.render(
  <AuthContextProvider>
    <BlogContextProvider>
      <App />
    </BlogContextProvider>
  </AuthContextProvider>
);

reportWebVitals();
