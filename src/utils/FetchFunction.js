export const useFetch = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await axios.get(
      "https://myforumserver-production.up.railway.app/api/posts"
    );
    setPosts(response.data);
  };
  return {
    posts,
    fetchPosts,
  };
};
