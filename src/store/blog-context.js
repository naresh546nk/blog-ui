import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import {
  deleteBlog,
  findDistinctCategory,
  getAllBlogs,
  getBlogById,
  getBlogsByCategoryAndDate
} from "../lib/api";
import AuthContext from "./auth-context";

const BlogContext = createContext({
  isLoading: "",
  blog: {},
  blogList: [],
  blogCategories: [],
  myBlogsCounts: 0,
  othersBlogsCounts: 0,
  findBlogsByCategoryAndDateRange: (props) => { },
  showYourBlogs: () => { },
  showOthersBlogs: () => { },
  getAllBlogs: () => { },
  getAllCategories: () => { },
  filterByCategory: () => { },
  deleteBlog: (id) => { },
  findBlogById: (id) => { }
  


});
export const BlogContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [blog, setBlog] = useState("");
  const [blogList, setBlogList] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [myBlogsCounts, setMyblogsCounts] = useState()
  const [otherBlogsCounts, setOthersBlogsCounts] = useState();
  const { token, user } = useContext(AuthContext);


  useEffect(() => {
    const ourBlogsCount = mainData.filter(blog => blog.userId == user.id).length;
    setMyblogsCounts(ourBlogsCount)
    setOthersBlogsCounts(mainData.length - ourBlogsCount);
    console.log('userEffect ..')
  }, [mainData, deleteBlog]);



  const showYourBlogsHandler = () => {
    const filterDataByYou = mainData.filter(filter => filter.userId == user.id);
    setBlogList(filterDataByYou);
  }
  const showOthersBlogsHandler = () => {
    const filterDataByOther = mainData.filter(filter => filter.userId != user.id);
    setBlogList(filterDataByOther);
  }



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

  const findBlogByIdHandler = (id) => {
    setIsLoading(true);
  const response = getBlogById({ id, token });
  response
    .then((data) => {
      setIsLoading(false);
      setBlog(data.data)
      console.log(data.data);
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
      setError(error.message);
    });
  return response;
};




const findBlogsByCategoryAndDateRangeHandler = (props) => {
  setIsLoading(true);
  const reponse = getBlogsByCategoryAndDate({ ...props, token })

  reponse.then(data => {
    console.log(data.datat);
    setBlogList(data.data)
    setIsLoading(false);
  }).catch(error => {
    console.log("Error : " + error)
    setIsLoading(false)
    setError(error.message)
  })

  return reponse;

}

// useEffect(() => {
//   getAllBlogHandler();
//   getAllCategoriesHandler()
// }, [])

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
  findBlogById: findBlogByIdHandler,
  showYourBlogs: showYourBlogsHandler,
  showOthersBlogs: showOthersBlogsHandler,
  myBlogsCounts: myBlogsCounts,
  othersBlogsCounts: otherBlogsCounts,
  findBlogsByCategoryAndDateRange: findBlogsByCategoryAndDateRangeHandler

};
return (
  <BlogContext.Provider value={contextValue}>
    {props.children}
  </BlogContext.Provider>
);
};

export default BlogContext;
