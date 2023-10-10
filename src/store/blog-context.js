import { useContext, useState } from "react";
import { createContext } from "react";
import {
  deleteBlog,
  findDistinctCategory,
  getAllBlogs,
  getBlogById,
} from "../lib/api";
import AuthContext from "./auth-context";

const BlogContext = createContext({
  isLoading: "",
  blog: "",
  blogList: [],
  blogCategories: [],
  getAllBlogs: () => {},
  getAllCategories: () => {},
  filterByCategory: () => {},
  deleteBlog: (id) => {},
  featchBlogById: (id) => {},
});
export const BlogContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [blog, setBlog] = useState("");
  const [blogList, setBlogList] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [mainData, setMainData] = useState([]);
  const { token } = useContext(AuthContext);

  const filterByCategoryHandler = async (category) => {
    const newBlogList = mainData.filter((post) =>
      post.category.toLowerCase().includes(category.toLowerCase())
    );
    setBlogList(newBlogList);
  };

  const getAllCategoriesHandler = () => {
    setError(null);
    setIsLoading(true);
    const response = findDistinctCategory({ token });
    response
      .then((data) => {
        setBlogCategories(data.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  };

  const getAllBlogHandler = () => {
    setError(null);
    setIsLoading(true);
    const response = getAllBlogs({ token });
    response
      .then((data) => {
        console.log("all blogs :", data.data);
        setBlogList(data.data);
        setMainData(data.data);
        setIsLoading(false);
        return data.data;
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  };

  const deleteBlogHandler = (id) => {
    setError(null);
    const response = deleteBlog({ id, token });
    response
      .then((data) => {
        console.log("Blog deleted successfully ");
        return data.data;
      })
      .catch((error) => setError(error.message));

    return response;
  };

  const featchBlogByIdHandler = (id) => {
    setError(null);
    setIsLoading(true);
    const response = getBlogById({ id, token });
    response
      .then((data) => {
        setIsLoading(false);
        console.log(data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setError(error.message);
      });
    return response;
  };

  const contextValue = {
    isLoading: isLoading,
    error: error,
    blog: blog,
    blogList: blogList,
    blogCategories: blogCategories,
    getAllBlogs: getAllBlogHandler,
    getAllCategories: getAllCategoriesHandler,
    filterByCategory: filterByCategoryHandler,
    deleteBlog: deleteBlogHandler,
    featchBlogById: featchBlogByIdHandler,
  };
  return (
    <BlogContext.Provider value={contextValue}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
