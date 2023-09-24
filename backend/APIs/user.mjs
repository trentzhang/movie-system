import {
  getListsByUserEmail,
  getListsByUserLiked,
} from "../SQLQueries/list.mjs";
import {
  getMoviesByListId,
  getMoviesByUserLiked,
} from "../SQLQueries/movie.mjs";
import { getUserByEmail } from "../SQLQueries/user.mjs";
import { executeSqlQuery } from "../SQLQueries/connect/sql.mjs";
export async function getUserInfoByEmailAPI(req, res) {
  try {
    const email = req.params.email;
    const fullInfo = req.params.fullInfo;
    const user = (await getUserByEmail(email))[0];

    if (fullInfo == "full") {
      user.likedMovies = await getMoviesByUserLiked(email);
      user.likedLists = await getListsByUserLiked(email);

      user.lists = await getListsByUserEmail(email);
    }

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

  // Initialize an array to store the columns and values
  const columns = [];
  const values = [];

  // Check if each field is defined and add it to the respective arrays
  if (name) {
    columns.push("username");
    values.push(`'${name}'`);
  }

  if (email) {
    columns.push("email");
    values.push(`'${email}'`);
  }

  if (gender) {
    columns.push("gender");
    values.push(`'${gender}'`);
  }

  if (birthday) {
    columns.push("birthday");
    values.push(`'${birthday}'`);
  }

  // Check if there are values to insert
  if (columns.length === 0) {
    // No values to insert, return early or handle it as needed
    return null;
  }

  // Create the SQL statement using the columns and values
  const statement = `INSERT INTO user (${columns.join(
    ", "
  )}) VALUES (${values.join(", ")});`;

  const result = await executeSqlQuery(statement);
  return result;
}

export async function putNewlyRegisteredUserInfoAPI(req, res) {
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
