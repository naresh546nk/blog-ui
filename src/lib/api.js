import axios from "axios";

var BASEURL = "bbservice.db.io";
if (process.env?.NODE_ENV === "development") {
  BASEURL = "http://localhost:8080";
}
const DOMAIN_URL = BASEURL + "/api/v1.0/blogsite";
console.log("BASEURL :", BASEURL);
export const findDistinctCategory = ({ token }) => {
  return axios.get(`${DOMAIN_URL}/blogs/info/category`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const saveUser = async (user) => {
  const userWithAuthority = { ...user, authority: "USER" };
  return axios.post(`${DOMAIN_URL}/user/add`, userWithAuthority, {
    headers: {
      //Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getUserByUsername = ({ username, token }) => {
  console.log("token : ", token);
  return axios.get(`${DOMAIN_URL}/user/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getAllBlogs = ({ token }) => {
  return axios.get(`${DOMAIN_URL}/getall`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getBlogById = ({ id, token }) => {
  return axios.get(`${DOMAIN_URL}/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const submitNewBlog = async ({ post, token }) => {
  return axios.post(`${DOMAIN_URL}/blogs/add`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteBlog = ({ id, token }) => {
  return fetch(`${DOMAIN_URL}/blogs/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
