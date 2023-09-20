import moment from "moment";
import { executeSqlQuery } from "./sql/sql.mjs";

export async function getMoviesByUserEmail(email) {
  const query1 = "SELECT movie_id FROM user_liked_movie WHERE user_email = ?;";
  const movieIdList = await executeSqlQuery(query1, [email]);
}

export async function getMoviesById(id) {
  const query = "SELECT * FROM movie WHERE id = ?;";
  return await executeSqlQuery(query, [id]);
}

export async function updateMovieLikedById(id, likedNum) {
  const statement = "UPDATE movie SET liked_num = ? WHERE id = ?;";
  await executeSqlQuery(statement, [likedNum, id]);
}

export async function likeMovie(email, movie_id) {
  const query =
    "INSERT INTO user_liked_movie (movie_id, user_email) VALUES (?, ?);";
  await executeSqlQuery(query, [movie_id, email]);
}

export async function deleteLikeMovie(email, movie_id) {
  const query =
    "DELETE FROM user_liked_movie WHERE movie_id = ? and user_email = ?;";
  await executeSqlQuery(query, [movie_id, email]);
}

export async function getRecommendedMoviesSortedByRating(limit, email) {
  const query =
    "SELECT * FROM movie WHERE id not in (select movie_id from user_liked_movie where user_email = ?) ORDER BY rating LIMIT ?;";
  return await executeSqlQuery(query, [email, limit]);
}

export async function getMoviesSortedByRating(limit) {
  const query = "SELECT * FROM movie ORDER BY rating LIMIT ?;";
  return await executeSqlQuery(query, [limit]);
}

export async function getMoviesByUserLiked(email) {
  const query =
    "select * from movie where id in (select movie_id from user_liked_movie where user_email = ?);";
  return await executeSqlQuery(query, [email]);
}

export async function getMoviesByListId(listId) {
  const query =
    "select * from movie where id in (select movie_id from list2movie where list_id = ?);";
  return await executeSqlQuery(query, [listId]);
}

export async function updateMovieRatingById(movieId, rating, num) {
  const query = "UPDATE movie SET rating = ?, rate_num = ? WHERE id = ?;";
  await executeSqlQuery(query, [rating, num, movieId]);
}

export async function rateMoviesById(email, movieId, rating) {
  const statement =
    "INSERT INTO rating (user, movie_id, rating) VALUES (?, ?, ?);";
  await executeSqlQuery(statement, [email, movieId, rating]);
}

export async function createCommentForMovie(email, movieId, comment, username) {
  const statement =
    "INSERT INTO movie_comments (user_email, movie_id, comment, created_time, username) VALUES (?, ?, ?, ?, ?);";
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  await executeSqlQuery(statement, [email, movieId, comment, date, username]);
}

export async function getCommentsByMovieId(movieId) {
  const query = "SELECT * FROM movie_comments WHERE movie_id = ?;";
  return await executeSqlQuery(query, [movieId]);
}

export async function searchMovies(keyword, type, language) {
  const params = [];
  var query =
    "SELECT * FROM movie WHERE title like ? and type like ? and language like ? limit 20;";
  params.push("%" + keyword + "%");

  params.push("%" + type + "%");
  params.push("%" + language + "%");

  return await executeSqlQuery(query, params);
}

export async function getUserLikedMovieByEmailAndMovieId(email, id) {
  var query =
    "select * from user_liked_movie where user_email = ? and movie_id = ?;";
  return await executeSqlQuery(query, [email, id]);
}
