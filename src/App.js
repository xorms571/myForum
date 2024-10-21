import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import PostDetail from "./components/PostDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import DeleteAccount from "./components/DeleteAccount";
import { AuthProvider } from "./AuthContext";
import Header from "./components/Header";

const App = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:5000/api/posts");
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PostList posts={posts} />} />
          <Route path="/create" element={<CreatePost />} />
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
