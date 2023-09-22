import { executeSqlQuery } from "./sql/sql.mjs";

export async function createUser(body, token) {
  const email = body.email;
  const name = body.name;
  const gender = body.gender;
  const birthday = body.birthday;
  const statement =
    "INSERT INTO user (username, email, token, gender, birthday) " +
    "VALUES (?, ?, ?, ?, ?);";
  const result = await executeSqlQuery(statement, [
    name,
    email,
    token,
    gender,
    birthday,
  ]);
  return result;
}

export async function getUserByEmail(email) {
  const query = "SELECT * from user where email = ?;";
  return await executeSqlQuery(query, [email]);
}

export async function getUsersWhoLikedMovieByMovieId(movieId) {
  const query =
    "SELECT * FROM user WHERE email IN (SELECT user_email from user_liked_movie where movie_id = ?);";
  return await executeSqlQuery(query, [movieId]);
}
