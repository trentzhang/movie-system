// app.js
import express from "express";
import { homePageAPI } from "./APIs/homepage.mjs";
import cors from "cors";
import { getMovieByIdAPI, searchMoviesAPI } from "./APIs/movie.mjs";
import { getListByIdAPI } from "./APIs/list.mjs";
import {
  getUserInfoByEmailAPI,
  postNewlyRegisteredUserInfoAPI,
} from "./APIs/user.mjs";
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/homepage", homePageAPI);
app.get("/movies/:movie_id", getMovieByIdAPI);
app.get("/lists/:list_id", getListByIdAPI);
app.get("/user/:email", getUserInfoByEmailAPI);
app.put("/liked/movies/:movie_id");
app.put("/liked/lists/:list_id");
app.put("/lists/movies/:movie_id");
app.delete("/liked/movies/:movie_id");
app.delete("/liked/lists/:list_id");
app.delete("/lists/movies/:movie_id");
app.post("/lists");
app.post("/movies/:movie_id/rating");
app.post("/movies/:movie_id/comments");
app.post("/search_movie", searchMoviesAPI);
app.put("/user/signup", postNewlyRegisteredUserInfoAPI);
app.post("/user/login");
app.post("/user/logout");

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
