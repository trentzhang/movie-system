import {
  getListsById,
  createList,
  getListsByUserEmail,
} from "../SQLQueries/list.mjs";
import { getMoviesByListId } from "../SQLQueries/movie.mjs";

export async function getListByIdAPI(req, res) {
  try {
    const listId = req.params.list_id;
    const movies = await getMoviesByListId(listId);
    const lists = await getListsById(listId);
    const list = lists[0];
    list.movies = movies;
    return res.status(200).send({ message: "OK", data: list });
  } catch (err) {
    res.status(500).send({
      message: "ERROR: Encounter error getting List by id.",
      data: err,
    });
  }
}
export async function getListByEmailAPI(req, res) {
  try {
    const email = req.params.email;
    const lists = await getListsByUserEmail(email);

    return res.status(200).send({ message: "OK", data: lists });
  } catch (err) {
    res.status(500).send({
      message: "ERROR: Encounter error getting List by id.",
      data: err,
    });
  }
}

export async function createListAPI(req, res) {
  try {
    const listName = req.body.listName;
    const creator = req.body.creator;
    const description = req.body.description;
    const result = await createList(creator, listName, description);
    const id = result.insertId;
    // await createFavList(id, email, true);
    return res.status(200).send({ message: "OK", data: { id: id } });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "ERROR: Encounter error during creating list.",
      data: err,
    });
  }
}
