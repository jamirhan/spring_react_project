import * as React from "react";
import { Howl } from "howler";
import RecordButton from "./RecordButton";
import SendFileButton from "./SendFileButton";
import AuthService from "../services/auth";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Feed from "./Feed";
import Post from "./Post";

export default function App() {
  return (
    <div className="App">
      <SendFileButton />
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/feed">Feed</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </div>
  );
}
