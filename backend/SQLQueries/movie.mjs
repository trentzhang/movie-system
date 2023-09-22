import moment from "moment";
import { executeSqlQuery } from "./connect/sql.mjs";

export async function createCommentForMovie(email, movieId, comment, username) {
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const statement = `
    INSERT INTO movie_comments (user_email, movie_id, comment, created_time, username)
    VALUES ('${email}', '${movieId}', '${comment}', '${date}', '${username}');
  `;
  await executeSqlQuery(statement);
}

export async function deleteLikeMovie(email, movie_id) {
  const query = `
    DELETE FROM user_liked_movie
    WHERE movie_id = '${movie_id}' AND user_email = '${email}';
  `;
  await executeSqlQuery(query);
}

export async function getCommentsByMovieId(movieId) {
  const query = `
    SELECT * FROM movie_comments
    WHERE movie_id = '${movieId}';
  `;
  return await executeSqlQuery(query);
}

export async function getMoviesSortedByRating(limit) {
  const query = `
    SELECT * FROM movie
    ORDER BY rating DESC
    LIMIT ${limit};
  `;
  return await executeSqlQuery(query);
}

export async function getMoviesRandom(limit) {
  const query = `
    SELECT * FROM movie
    ORDER BY RAND()
    LIMIT ${limit};
  `;
  return await executeSqlQuery(query);
}

export async function getMoviesByUserLiked(email) {
  const query = `
    SELECT * FROM movie
    WHERE id IN (
      SELECT movie_id
      FROM user_liked_movie
      WHERE user_email = '${email}'
    );
  `;
  return await executeSqlQuery(query);
}

export async function getMoviesByListId(listId) {
  const query = `
    SELECT * FROM movie
    WHERE id IN (
      SELECT movie_id
      FROM list2movie
      WHERE list_id = '${listId}'
    );
  `;
  return await executeSqlQuery(query);
}

export async function getMoviesByUserEmail(email) {
  const query1 = `
    SELECT movie_id
    FROM user_liked_movie
    WHERE user_email = '${email}';
  `;
  const movieIdList = await executeSqlQuery(query1);
}

export async function getMoviesById(id) {
  const query = `
    SELECT * FROM movie
    WHERE id = '${id}';
  `;
  return await executeSqlQuery(query);
}

export async function getRecommendedMoviesSortedByRating(limit, email) {
  const query = `
    SELECT * FROM movie
    WHERE id NOT IN (
      SELECT movie_id
      FROM user_liked_movie
      WHERE user_email = '${email}'
    )
    ORDER BY rating
    LIMIT ${limit};
  `;
  return await executeSqlQuery(query);
}

export async function getUserLikedMovieByEmailAndMovieId(email, id) {
  const query = `
    SELECT * FROM user_liked_movie
    WHERE user_email = '${email}' AND movie_id = '${id}';
  `;
  return await executeSqlQuery(query);
}

export async function likeMovie(email, movie_id) {
  const query = `
    INSERT INTO user_liked_movie (movie_id, user_email)
    VALUES ('${movie_id}', '${email}');
  `;
  await executeSqlQuery(query);
}

export async function rateMoviesById(email, movieId, rating) {
  const statement = `
    INSERT INTO rating (user, movie_id, rating)
    VALUES ('${email}', '${movieId}', '${rating}');
  `;
  await executeSqlQuery(statement);
}

export async function searchMovies(keyword, type, language) {
  let query = "SELECT * FROM movie WHERE 1=1";

  if (keyword) {
    query += ` AND title LIKE '%${keyword}%'`;
  }

  if (type) {
    query += ` AND type LIKE '%${type}%'`;
  }

  if (language) {
    query += ` AND language LIKE '%${language}%'`;
  }

  query += " LIMIT 20;";

  return await executeSqlQuery(query);
}

export async function updateMovieRatingById(movieId, rating, num) {
  const query = `
    UPDATE movie
    SET rating = '${rating}', rate_num = '${num}'
    WHERE id = '${movieId}';
  `;
  await executeSqlQuery(query);
}

export async function updateMovieLikedById(id, likedNum) {
  const statement = `
    UPDATE movie
    SET liked_num = '${likedNum}'
    WHERE id = '${id}';
  `;
  await executeSqlQuery(statement);
}
