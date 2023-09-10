import React from "react";
import BlogThumbnail from "./BlogThumbnail";

const BlogThumbnailsList = (props) => {
  return props.posts.map((post) => {
    return <BlogThumbnail key={post.id} post={post} />;
  });
};

export default BlogThumbnailsList;
