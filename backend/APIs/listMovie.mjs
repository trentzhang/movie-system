import { addMovieToList, deleteMovieFromList } from "../SQLQueries/list.mjs";

export async function putMovieToListAPI(req, res) {
  try {
    const listId = req.params.list_id;
    const movieId = req.params.movie_id;

    await addMovieToList(listId, movieId);
    return res.status(200).send({ message: "OK", data: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "ERROR: Encounter error during adding movie to list.",
      data: err,
    });
  }
}
export async function deleteMovieFromListAPI(req, res) {
  try {
    const listId = req.params.list_id;
    const movieId = req.params.movie_id;

    await deleteMovieFromList(listId, movieId);
    return res.status(200).send({ message: "OK", data: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "ERROR: Encounter error during deleting movie to list.",
      data: err,
    });
  }
}
