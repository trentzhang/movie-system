import { executeSqlQuery } from "./sql/sql.mjs";

export async function saveToken(email, token) {
  const statement = "UPDATE user SET token = ? WHERE email = ?;";
  const result = await executeSqlQuery(statement, [token, email]);
  return result;
}

export async function checkToken(email, token) {
  if (!email) {
    return false;
  }
  const statement = "SELECT token FROM user WHERE email = ?;";
  const result = await executeSqlQuery(statement, [email]);
  if (!result || result != token) {
    return false;
  } else {
    return true;
  }
}
