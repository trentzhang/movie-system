import { getListsByUserEmail } from "../SQLQueries/list.mjs";
import {
  getMoviesByListId,
  getMoviesByUserLiked,
} from "../SQLQueries/movie.mjs";
import { getUserByEmail } from "../SQLQueries/user.mjs";
import { executeSqlQuery } from "../SQLQueries/connect/sql.mjs";
export async function getUserInfoByEmailAPI(req, res) {
  try {
    // const cookies = parseCookies(req.headers.cookies);
    // const email = cookies.email;
    const email = req.params.email;
    const users = await getUserByEmail(email);
    const user = users[0];
    delete user.token;
    const likedMovies = await getMoviesByUserLiked(email);
    const lists = await getListsByUserEmail(email);
    for (var i = 0; i < lists.length; i++) {
      const movies = await getMoviesByListId(lists[i].id);
      lists[i].movies = movies;
    }
    user.lists = lists;
    user.movies = likedMovies;
    res.status(200).send({ message: "OK", data: user });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "ERROR: Encounter error during user signing up.",
      data: err,
    });
  }
}

async function createUser(body) {
  const email = body.email;
  const name = body.name;
  const gender = body.gender;
  const birthday = body.birthday;
  const statement =
    "INSERT INTO user (username, email, gender, birthday) " +
    "VALUES (?, ?, ?, ?);";
  const result = await executeSqlQuery(statement, [
    name,
    email,
    gender,
    birthday,
  ]);
  return result;
}

export async function postNewlyRegisteredUserInfoAPI(req, res) {
  try {
    await createUser(req.body);
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "ERROR: Encounter error during user signing up.",
      data: err,
    });
  }
}
