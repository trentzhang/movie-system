// import user defined package
import {
  getRecommendedMoviesSortedByRating,
  getMoviesByListId,
  getMoviesByUserLiked,
  getMoviesSortedByRating,
  getMoviesRandom,
} from "../access/movie.mjs";
import {
  getRecommendedListSortedByRating,
  getListsByUserEmail,
  addMovieToList,
  getListSortedByRating,
} from "../access/list.mjs";
import { getUserByEmail } from "../access/user.mjs";
import { parseCookies } from "../utils/cookiesUtil.mjs";

export async function homePageAPI(req, res) {
  try {
    const homepage = await getHomepage();
    return res.status(200).send({ message: "OK", data: homepage });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "ERROR: Encounter error during user signing up.",
      data: err,
    });
  }
}

// async function getHomepage(email) {
//   const recommendedMovies = await getRecommendedMoviesSortedByRating(10, email);
//   const recommendedLists = await getRecommendedListSortedByRating(10, email);
//   // console.log(recommendedMovies);
//   const recommendedListsWithMovies = await addMovieToList(recommendedLists);
//   for (var i = 0; i < recommendedListsWithMovies.length; i++) {
//     const owners = await getUserByEmail(recommendedListsWithMovies[i].creator);
//     const owner = owners[0];
//     delete owner.token;
//     recommendedListsWithMovies[i].owner_info = owner;
//   }
//   return {
//     movies: [],
//     lists: [],
//     recommendedMovies: recommendedMovies,
//     recommendedLists: recommendedListsWithMovies,
//   };
// }\

async function getHomepage(limit = 5) {
  const MoviesSortedByRating = await getMoviesSortedByRating(limit);
  const MoviesRandom = await getMoviesRandom(limit);
  const Lists = await getListSortedByRating(limit);
  return {
    moviesRandom: MoviesRandom,
    moviesSortedByRating: MoviesSortedByRating,
    lists: Lists,
  };
}

export default homePageAPI; // Export the async function
