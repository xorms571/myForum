import axios from "axios";
import { useState } from "react";

export const useFetch = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await axios.get(
      "https://render.com/docs/web-services#port-binding/api/posts"
    );
    setPosts(response.data);
  };
  return {
    posts,
    fetchPosts,
  };
};
