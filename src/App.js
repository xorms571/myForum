import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import PostDetail from "./components/PostDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import DeleteAccount from "./components/DeleteAccount";
import { AuthProvider } from "./utils/AuthContext";
import Header from "./components/Header";
import { useFetch } from "./utils/functions";

const App = () => {
  const { fetchPosts, posts } = useFetch();
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PostList posts={posts} />} />
          <Route
            path="/create"
            element={<CreatePost fetchPosts={fetchPosts} />}
          />
          <Route path="/posts/:id" element={<PostDetail posts={posts} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
