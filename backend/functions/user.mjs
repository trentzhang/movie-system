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
