const BASEURL = process.env.BASEURL || "http://localhost:8080";
const DOMAIN_URL = BASEURL + "/api/v1.0/blogsite";
const token = sessionStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const findDistinctCategory = async () => {
  const response = await fetch(`${DOMAIN_URL}/blogs/info/category`, {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

export const saveUser = async (user) => {
  const userWithAuthority = { ...user, authority: "USER" };
  const response = await fetch(`${DOMAIN_URL}/user/add`, {
    method: "POST",
    body: JSON.stringify(userWithAuthority),
    headers,
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

export const getUserByUsername = async (username) => {
  const response = await fetch(`${DOMAIN_URL}/user/${username}`);
  const jsonData = response.json();
  console.log("Response :", jsonData);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return jsonData;
};

export const getAllBlogs = async () => {
  const response = await fetch(`${DOMAIN_URL}/getall`);
  const data = await response.json();
  return response.ok ? data : [];
};

export const getPostById = async (id) => {
  const response = await fetch(`${DOMAIN_URL}/blogs/${id}`);
  if (!response.ok) {
    throw new Error("Post with id: " + id + " not found");
  }
  const data = await response.json();
  console.log("Blog with ID: ", data);
  return data;
};

export const submitNewPost = async (newPost) => {
  console.log("newPost", newPost);
  const response = await fetch(`${DOMAIN_URL}/blogs/add`, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers,
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

export const updatePost = async (updatedPost, token) => {
  const response = await fetch(`${DOMAIN_URL}/blogs/add`, {
    method: "PUT",
    body: JSON.stringify(updatedPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

export const deletePost = async (postId) => {
  const response = await fetch(`${DOMAIN_URL}/blogs/delete/${postId}`, {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.ok;
};

export const register = async (registerRequest) => {
  const response = await fetch(`${DOMAIN_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(registerRequest),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.userName);
  }
  return data;
};

export const login = async (loginRequest) => {
  const response = await fetch(`${DOMAIN_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(loginRequest),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("##Login Data:", data);
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
