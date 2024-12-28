import axios from "axios";
import { useState } from "react";

export const useFetch = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await axios.get(
      "https://myforumserver.onrender.com/api/posts"
    );
    setPosts(response.data);
  };
  return {
    posts,
    fetchPosts,
  };
};
