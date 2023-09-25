import {
  getUserLikedListByEmailAndListId,
  getListsById,
  updateListLikedById,
  likeList,
  unlikeList,
  getListsLikesById,
} from "../SQLQueries/list.mjs";

export async function putUserLikeListAPI(req, res) {
  try {
    const email = req.params.email;
    const list_id = req.params.list_id;

    await likeList(email, list_id);
    // update liked_num column in list table
    let liked_num = await getListsLikesById(list_id);
    liked_num = liked_num[0]["COUNT(*)"];
    await updateListLikedById(list_id, liked_num);
    return res.status(200).send({
      message: "OK",
      data: `Added ${email} liked ${list_id}, total like is now: ${liked_num}`,
    });
  } catch (err) {
    console.log("err :>> ", err);
    res.status(500).send({
      message: `ERROR: Encounter error during adding user like list`,
      data: { err },
    });
  }
}
export async function deleteUserLikeListAPI(req, res) {
  try {
    const email = req.params.email;
    const list_id = req.params.list_id;

    await unlikeList(email, list_id);
    // update liked_num column in list table
    let liked_num = await getListsLikesById(list_id);
    liked_num = liked_num[0]["COUNT(*)"];
    await updateListLikedById(list_id, liked_num);
    return res.status(200).send({
      message: "OK",
      data: `Deleted ${email} liked ${list_id}, total like is now: ${liked_num}`,
    });
  } catch (err) {
    console.log("err :>> ", err);
    res.status(500).send({
      message: `ERROR: Encounter error during adding user like list`,
      data: { err },
    });
  }
}
export async function getUserLikeListAPI(req, res) {
  try {
    const email = req.params.email;
    const list_id = req.params.list_id;
    const result = await getUserLikedListByEmailAndListId(email, list_id);
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
      message: "ERROR: Encounter error during user signing up.",
      data: { err },
    });
  }
}
