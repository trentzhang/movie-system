import {
  getUserLikedMovieByEmailAndMovieId,
  likeMovie,
  updateMovieLikedById,
} from "../SQLQueries/movie.mjs";
import { getMovieByIdAPI } from "./movie.mjs";

export async function putUserLikeMovieAPI(req, res) {
  try {
    const email = req.params.email;
    const movie_id = req.params.movie_id;
    //   insert ignore into user_liked_movie (user_email,movie_id) values ('test@gmail.com','tt0078113');
    await likeMovie(email, movie_id);
    // update liked_num column in movie table, liked_num+=1
    const movie = await getMovieByIdAPI(movie_id);
    await updateMovieLikedById(movie_id, movie[0].liked_num + 1);
    return res
      .status(200)
      .send({ message: "OK", data: `Added ${email} liked ${movie_id}` });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `ERROR: Encounter error during adding user like movie`,
      data: err,
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
    console.log(err);
    res.status(500).send({
      message: "ERROR: Encounter error during user signing up.",
      data: err,
    });
  }
}
