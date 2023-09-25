import React from "react";
import ReactDOM from "react-dom";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./Home/Home.js";
import ListPage from "./ListDetailPage/ListPage.js";
import MovieDetail from "./MovieDetailPage/MovieDetail.js";
import Search from "./Search/Search.js";
import UserHome from "./UserCenter/UserHome.js";
import UserPage from "./UserPage/UserPage";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@splidejs/react-splide/dist/css/themes/splide-default.min.css";

ReactDOM.render(
  <div className="text-bg-dark min-vh-100">
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/movie/:movie_Id" element={<MovieDetail />}></Route>
        <Route path="/userhome" element={<UserHome />}></Route>
        <Route path="/advanced_search" element={<Search />}></Route>
        <Route path="/list/:list_id" element={<ListPage />}></Route>
        <Route path="/user/:email" element={<UserPage />}></Route>
        <Route exact path="/" element={<Navigate to="/home" />}></Route>
      </Routes>
    </Router>
  </div>,

  document.getElementById("root")
);
