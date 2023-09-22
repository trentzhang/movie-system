import { executeSqlQuery } from "./connect/sql.mjs";

export async function addMovieToList(listId, movieId) {
  const statement = "INSERT INTO list2movie (movie_id, list_id) VALUES (?, ?);";
  await executeSqlQuery(statement, [movieId, listId]);
}

export async function createList(email, name, description) {
  const statement =
    "INSERT INTO List (name, description, creator) VALUES (?, ?, ?);";
  return await executeSqlQuery(statement, [name, description, email]);
}

export async function createFavList(listId, user, isOwner) {
  const query =
    "INSERT INTO fav_list (list_id, user, is_owner) VALUES (?, ?, ?);";
  return await executeSqlQuery(query, [listId, user, isOwner]);
}

export async function deleteFavList(listId, user) {
  const query = "DELETE FROM fav_list WHERE list_id = ? and user = ?;";
  return await executeSqlQuery(query, [listId, user]);
}

export async function deleteMovieFromList(listId, movieId) {
  const statement =
    "DELETE FROM list2movie WHERE movie_id = ? and list_id = ?;";
  await executeSqlQuery(statement, [movieId, listId]);
}

export async function getRecommendedListSortedByRating(limit, email) {
  const query1 =
    "SELECT * FROM List WHERE id not in (select list_id from fav_list where user = ?) ORDER BY liked LIMIT ?;";
  return await executeSqlQuery(query1, [email, limit]);
}

export async function getListSortedByRating(limit) {
  const query1 = "SELECT * FROM List ORDER BY liked LIMIT ?;";
  return await executeSqlQuery(query1, [limit]);
}

export async function getListsByUserEmail(email) {
  const query =
    "SELECT * FROM List WHERE id in (select list_id from fav_list where user = ?);";
  return await executeSqlQuery(query, [email]);
}

export async function getListByOwnerEmail(email) {
  const query =
    "SELECT * FROM List WHERE id in (select list_id from fav_list where user = ? and is_owner = 1);";
  return await executeSqlQuery(query, [email]);
}

export async function getListsById(listId) {
  const query = "SELECT * FROM List WHERE id = ?;";
  return await executeSqlQuery(query, [listId]);
}

export async function getListsByMovieId(movieId) {
  const query =
    "SELECT * FROM List WHERE id IN (SELECT list_id FROM list2movie WHERE movie_id = ?) ORDER BY liked LIMIT 10;";
  return await executeSqlQuery(query, [movieId]);
}

export async function getList2MovieByEmailAndMovieId(email, movieId) {
  const query =
    "SELECT * FROM List WHERE creator = ? and id in (SELECT list_id from list2movie where movie_id = ?);";

  return await executeSqlQuery(query, [email, movieId]);
}

export async function searchListsByNameKeyword(keyword) {
  const query = "SELECT * FROM List WHERE name LIKE ? LIMIT 10;";
  return await executeSqlQuery(query, ["%" + keyword + "%"]);
}

export async function updateListLiked(listId, num) {
  const statement = "UPDATE List SET liked = ? WHERE id = ?;";
  await executeSqlQuery(statement, [num, listId]);
}
