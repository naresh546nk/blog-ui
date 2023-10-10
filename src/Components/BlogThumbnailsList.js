import React from "react";
import BlogThumbnail from "./BlogThumbnail";

const BlogThumbnailsList = (props) => {
  return props.posts.map((post) => {
    return (
      <div className="d-flex w-100" key={post.id}>
        <BlogThumbnail post={post} />;
      </div>
    );
  });
};

export default BlogThumbnailsList;
