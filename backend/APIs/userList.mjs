import {
  getUserLikedListByEmailAndListId,
  getListsById,
  updateListLikedById,
  likeList,
} from "../SQLQueries/list.mjs";

export async function putUserLikeListAPI(req, res) {
  try {
    const email = req.params.email;
    const list_id = req.params.list_id;
    //   insert ignore into user_liked_list (user_email,list_id) values ('test@gmail.com','tt0078113');
    await likeList(email, list_id);
    // update liked_num column in list table, liked_num+=1
    const list = await getListsById(list_id);
    await updateListLikedById(list_id, list[0].liked_num + 1);
    return res
      .status(200)
      .send({ message: "OK", data: `Added ${email} liked ${list_id}` });
  } catch (err) {
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
    console.log(err);
    res.status(500).send({
      message: "ERROR: Encounter error during user signing up.",
      data: err,
    });
  }
}
