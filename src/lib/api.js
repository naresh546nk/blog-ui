import axios from "axios";
import { logger } from "../Components/utils/Logger";

logger.log("All the env variables proces.env:", process.env);

var BASEURL = "http://localhost:9000";
if (process.env?.NODE_ENV === "production") {
  BASEURL =
    "http://ecs-LoadBala-lCGvL6kGxI8Y-d1985bb2948918ad.elb.ap-south-1.amazonaws.com:9000";
}
const DOMAIN_URL = BASEURL + "/api/v1.0/blogsite";
logger.log("BASEURL :", BASEURL);
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
  return axios.post(`${DOMAIN_URL}/users/add`, userWithAuthority, {
    headers: {
      //Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getUserByUsername = ({ username, token }) => {
  return axios.get(`${DOMAIN_URL}/users/username/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getBlogsByCategoryAndDate = ({
  category,
  startDate,
  endDate,
  token,
}) => {
  return axios.get(
    `${DOMAIN_URL}/blogs/info/${category}/${startDate}/${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getAllBlogs = ({ token }) => {
  return axios.get(`${DOMAIN_URL}/blogs/getall`, {
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

export const getUserById = ({ id, token }) => {
  return axios.get(`${DOMAIN_URL}/users/${id}`, {
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
  return axios.delete(`${DOMAIN_URL}/blogs/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
