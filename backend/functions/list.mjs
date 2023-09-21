import { checkToken } from "../access/auth.mjs";
import {
  likeMovie,
  deleteLikeMovie,
  getMoviesById,
  updateMovieLikedById,
  updateMovieRatingById,
  rateMoviesById,
  createCommentForMovie,
  getCommentsByMovieId,
  getMoviesByListId,
  getMoviesByUserLiked,
  searchMovies,
  getUserLikedMovieByEmailAndMovieId,
} from "../access/movie.mjs";
import {
  createList,
  addMovieToList,
  deleteMovieFromList,
  getListsById,
  createFavList,
  deleteFavList,
  getListsByUserEmail,
  getListsByMovieId,
  updateListLiked,
  searchListsByNameKeyword,
  getList2MovieByEmailAndMovieId,
  getListByOwnerEmail,
} from "../access/list.mjs";
import {
  getUsersWhoLikedMovieByMovieId,
  getUserByEmail,
} from "../access/user.mjs";
import { parseCookies } from "../utils/cookiesUtil.mjs";

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
