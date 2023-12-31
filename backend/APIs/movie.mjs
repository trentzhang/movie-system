import {
  getListsByMovieId,
  searchListsByNameKeyword,
} from "../SQLQueries/list.mjs";
import {
  getCommentsByMovieId,
  getMoviesById,
  searchMovies,
} from "../SQLQueries/movie.mjs";
import {
  getUserByEmail,
  getUsersWhoLikedMovieByMovieId,
} from "../SQLQueries/user.mjs";

export async function getMovieByIdAPI(req, res) {
  try {
    // const cookies = parseCookies(req.headers.cookies);
    // console.log(cookies)
    // TODO implement login and show different movie details
    // const email = cookies.email;
    const movieId = req.params.movie_id;
    // console.log(movieId);
    const movies = await getMoviesById(movieId);

    if (!movies[0]) {
      return res.status(400).send({
        message: "movie id doesn't exist.",
      });
    } else {
      const movie = movies[0];
      const likedUsers = await getUsersWhoLikedMovieByMovieId(movieId);
      for (var i = 0; i < likedUsers.length; i++) {
        delete likedUsers[i].token;
      }
      movie.liked_users = likedUsers;
      const comments = await getCommentsByMovieId(movie.id);
      movie.comments = comments;
      const relatedLists = await getListsByMovieId(movieId);
      for (var i = 0; i < relatedLists.length; i++) {
        const users = await getUserByEmail(relatedLists[i].creator);
        const user = users[0];
        delete user.token;
        relatedLists[i].owner_info = user;
      }
      movie.related_lists = relatedLists;

      return res.status(200).send({ message: "OK", data: movie });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "ERROR: Encounter error getting movie by movie id.",
      data: err,
    });
  }
}

export async function searchMoviesAPI(req, res) {
  async function searchLists(keyword) {
    const lists = await searchListsByNameKeyword(keyword);
    for (var i = 0; i < lists.length; i++) {
      const users = await getUserByEmail(lists[i].creator);
      const user = users[0];
      delete user.token;
      lists[i].owner_info = user;
    }
    return lists;
  }
  const keyword = req.body.keyword;
  const type = req.body.type;
  const language = req.body.language;
  const searchType = req.body.searchType;
  const page = req.body.page;
  if (searchType === "Movie") {
    const movies = await searchMovies(keyword, type, language, page);
    return res.status(200).send({ message: "OK", data: movies });
  } else {
    const lists = await searchLists(keyword);
    return res.status(200).send({ message: "OK", data: lists });
  }
}
