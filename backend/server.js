// app.js
import express from "express";
import { homePageAPI } from "./APIs/homepage.mjs";
import cors from "cors";
import { getMovieByIdAPI, searchMoviesAPI } from "./APIs/movie.mjs";
import {
  createListAPI,
  getListByEmailAPI,
  getListByIdAPI,
} from "./APIs/list.mjs";
import {
  getUserLikeMovieAPI,
  putUserLikeMovieAPI,
  deleteUserLikeMovieAPI,
} from "./APIs/userMovie.mjs";
import {
  getUserInfoByEmailAPI,
  putNewlyRegisteredUserInfoAPI,
} from "./APIs/user.mjs";
import {
  putUserLikeListAPI,
  getUserLikeListAPI,
  deleteUserLikeListAPI,
} from "./APIs/userList.mjs";
import {
  deleteMovieFromListAPI,
  putMovieToListAPI,
} from "./APIs/listMovie.mjs";
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Continue to the next middleware
  next();
});
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/homepage", homePageAPI);
app.get("/movies/:movie_id", getMovieByIdAPI);
app.get("/lists/id/:list_id", getListByIdAPI);
app.get("/lists/email/:email", getListByEmailAPI);
app.get("/user/:fullInfo/:email", getUserInfoByEmailAPI);
app.get("/liked/movies/:email/:movie_id", getUserLikeMovieAPI);
app.get("/liked/lists/:email/:list_id", getUserLikeListAPI);

app.put("/liked/movies/:email/:movie_id", putUserLikeMovieAPI);
app.put("/liked/lists/:email/:list_id", putUserLikeListAPI);
app.put("/list/movie/:list_id/:movie_id", putMovieToListAPI);
app.put("/user/signup", putNewlyRegisteredUserInfoAPI);

app.delete("/liked/movies/:email/:movie_id", deleteUserLikeMovieAPI);
app.delete("/liked/lists/:email/:list_id", deleteUserLikeListAPI);
app.delete("/liked/movies/:movie_id");
app.delete("/liked/lists/:list_id");
app.delete("/list/movie/:list_id/:movie_id", deleteMovieFromListAPI);

app.post("/lists", createListAPI);
app.post("/movies/:movie_id/rating");
app.post("/movies/:movie_id/comments");
app.post("/search_movie", searchMoviesAPI);
app.post("/user/login");
app.post("/user/logout");

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
