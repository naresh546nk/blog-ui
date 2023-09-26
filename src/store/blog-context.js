import { useState } from "react";
import { createContext } from "react";
import { findDistinctCategory, getAllBlogs } from "../lib/api";

const BlogContext = createContext({
  isLoading: "",
  blog: "",
  blogList: [],
  blogCategories: [],
  getAllBlogs: () => {},
  getAllCategories: () => {},
  filterByCategory: () => {},
});
export const BlogContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [blog, setBlog] = useState("");
  const [blogList, setBlogList] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [mainData, setMainData] = useState([]);

  const filterByCategoryHandler = async (category) => {
    const newBlogList = mainData.filter((post) =>
      post.category.toLowerCase().includes(category.toLowerCase())
    );
    setBlogList(newBlogList);
  };

  const getAllCategoriesHandler = () => {
    setIsLoading(true);
    findDistinctCategory()
      .then((data) => {
        setBlogCategories(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  };

  const getAllBlogHandler = async () => {
    setIsLoading(true);
    getAllBlogs()
      .then((data) => {
        setBlogList(data);
        setMainData(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
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
  };
  return (
    <BlogContext.Provider value={contextValue}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
