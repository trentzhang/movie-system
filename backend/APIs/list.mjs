import { getListsById } from "../SQLQueries/list.mjs";
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
    console.log(err);
    res.status(500).send({
      message: "ERROR: Encounter error getting List by id.",
      data: err,
    });
  }
}
