import { executeSqlQuery } from "./connect/sql.mjs";

export async function addMovieToList(listId, movieId) {
  const statement = `INSERT INTO list2movie (movie_id, list_id) VALUES (${movieId}, ${listId});`;
  await executeSqlQuery(statement);
}

export async function createList(email, name, description) {
  const statement = `INSERT INTO List (name, description, creator) VALUES ('${name}', '${description}', '${email}');`;
  return await executeSqlQuery(statement);
}

export async function createFavList(listId, user, isOwner) {
  const query = `INSERT INTO fav_list (list_id, user, is_owner) VALUES (${listId}, '${user}', ${isOwner});`;
  return await executeSqlQuery(query);
}

export async function deleteFavList(listId, user) {
  const query = `DELETE FROM fav_list WHERE list_id = ${listId} and user = '${user}';`;
  return await executeSqlQuery(query);
}

export async function deleteMovieFromList(listId, movieId) {
  const statement = `DELETE FROM list2movie WHERE movie_id = ${movieId} and list_id = ${listId};`;
  await executeSqlQuery(statement);
}

export async function getRecommendedListSortedByRating(limit, email) {
  const query = `SELECT * FROM list WHERE id not in (select list_id from fav_list where user = '${email}') ORDER BY liked_num LIMIT ${limit};`;
  return await executeSqlQuery(query);
}

export async function getListSortedByRating(limit) {
  const query = `SELECT * FROM list ORDER BY liked_num LIMIT ${limit};`;
  return await executeSqlQuery(query);
}

export async function getListsByUserEmail(email) {
  const query = `SELECT * FROM list WHERE id in (select list_id from fav_list where user = '${email}');`;
  return await executeSqlQuery(query);
}

export async function getListByOwnerEmail(email) {
  const query = `SELECT * FROM list WHERE id in (select list_id from fav_list where user = '${email}' and is_owner = 1);`;
  return await executeSqlQuery(query);
}

export async function getListsById(listId) {
  const query = `SELECT * FROM list WHERE id = ${listId};`;
  return await executeSqlQuery(query);
}

export async function getListsLikesById(list_id) {
  const query = `SELECT COUNT(*) FROM user_liked_list
    WHERE list_id = '${list_id}';`;
  return await executeSqlQuery(query);
}

export async function getListsByMovieId(movieId) {
  const query = `SELECT * FROM list WHERE id IN (SELECT list_id FROM list2movie WHERE movie_id = '${movieId}') ORDER BY liked_num LIMIT 10;`;
  return await executeSqlQuery(query);
}

export async function getList2MovieByEmailAndMovieId(email, movieId) {
  const query = `SELECT * FROM list WHERE creator = '${email}' and id in (SELECT list_id from list2movie where movie_id = '${movieId}');`;
  return await executeSqlQuery(query);
}

export async function getUserLikedListByEmailAndListId(email, id) {
  const query = `
    SELECT * FROM user_liked_list
    WHERE user_email = '${email}' AND list_id = '${id}';
  `;
  return await executeSqlQuery(query);
}

export async function searchListsByNameKeyword(keyword) {
  const query = `SELECT * FROM list WHERE name LIKE '%${keyword}%' LIMIT 10;`;
  return await executeSqlQuery(query);
}

export async function updateListLikedById(id, likedNum) {
  const statement = `
    UPDATE list
    SET liked_num = '${likedNum}'
    WHERE id = '${id}';
  `;
  await executeSqlQuery(statement);
}
export async function likeList(email, list_id) {
  const statement = `
    INSERT IGNORE INTO user_liked_list (list_id, user_email)
    VALUES ('${list_id}', '${email}');
  `;
  await executeSqlQuery(statement);
}
export async function unlikeList(email, list_id) {
  const statement = `
    DELETE FROM user_liked_list WHERE list_id='${list_id}' AND  user_email='${email}'
  `;
  await executeSqlQuery(statement);
}
