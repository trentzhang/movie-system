import React from "react";
import ReactDOM from "react-dom";

import MovieDetail from "./MovieDetailPage/MovieDetail.js";
import Home from "./Home/Home.js";
import Search from "./Search/Search.js";
import UserHome from "./UserCenter/UserHome.js";
import ListPage from "./List/ListPage";
import UserPage from "./UserPage/UserPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // hashHistory,
  //   Link,
  Navigate,
} from "react-router-dom";

ReactDOM.render(
  <div className="text-bg-dark">
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
