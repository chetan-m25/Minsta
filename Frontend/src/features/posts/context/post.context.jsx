import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState(null);

  return (
    <PostContext.Provider
      value={{ loading, setLoading, post, setPost, feed, setFeed }}
    >
      {children}
    </PostContext.Provider>
  );
};
