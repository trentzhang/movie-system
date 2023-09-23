import {
  getMoviesById,
  getUserLikedMovieByEmailAndMovieId,
  likeMovie,
  unlikeMovie,
  updateMovieLikedById,
  getMoviesLikesById,
} from "../SQLQueries/movie.mjs";
import { getMovieByIdAPI } from "./movie.mjs";

export async function putUserLikeMovieAPI(req, res) {
  try {
    const email = req.params.email;
    const movie_id = req.params.movie_id;

    await likeMovie(email, movie_id);
    let liked_num = await getMoviesLikesById(movie_id);
    liked_num = liked_num[0]["COUNT(*)"];
    await updateMovieLikedById(movie_id, liked_num);
    return res.status(200).send({
      message: "OK",
      data: `Added ${email} liked ${movie_id}, total like is now: ${liked_num}`,
    });
  } catch (err) {
    console.log("err :>> ", err);
    res.status(500).send({
      message: `ERROR: Encounter error during putting user like movie`,
      data: { err },
    });
  }
}
export async function deleteUserLikeMovieAPI(req, res) {
  try {
    const email = req.params.email;
    const movie_id = req.params.movie_id;
    //   delete ignore into user_liked_movie (user_email,movie_id) values ('test@gmail.com','tt0078113');
    await unlikeMovie(email, movie_id);
    // update liked_num column in movie table
    let liked_num = await getMoviesLikesById(movie_id);
    liked_num = liked_num[0]["COUNT(*)"];
    await updateMovieLikedById(movie_id, liked_num);
    return res.status(200).send({
      message: "OK",
      data: `Deleted ${email} liked ${movie_id}, total like is now: ${liked_num}`,
    });
  } catch (err) {
    console.log("err :>> ", err);
    res.status(500).send({
      message: `ERROR: Encounter error during deleting user like movie`,
      data: { err },
    });
  }
}
export async function getUserLikeMovieAPI(req, res) {
  try {
    const email = req.params.email;
    const movie_id = req.params.movie_id;
    const result = await getUserLikedMovieByEmailAndMovieId(email, movie_id);
    let liked = false;
    if (result[0]) {
      liked = true;
    } else {
      liked = false;
    }
    return res.status(200).send({ message: "OK", data: liked });
  } catch (err) {
    console.log("err :>> ", err);
    res.status(500).send({
      message: "ERROR: Encounter error during get user like movie.",
      data: { err },
    });
  }
}
