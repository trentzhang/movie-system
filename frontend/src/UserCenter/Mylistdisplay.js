import { backendUrl } from "../settings";
import ListCard from "../List/ListCard";
import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { Card, ListGroup } from "react-bootstrap";
import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router";

async function getListsInfo(isOwnedList, email) {
  const userInfo = await (
    await fetch(`${backendUrl}/user/${email}`).catch((e) => {
      console.log(e);
      alert("Oops! No User Data Found, Please Try Again!");
    })
  ).json();

  const userLists = userInfo.data.lists;
  //   console.log(userLists);

  const data = Promise.all(
    userLists.map(async (list) => {
      if (!list.owner ^ isOwnedList) {
        console.log(list);
        return await (
          await fetch(`${backendUrl}/user/lists/${list.id}`)
        ).json();
      }
    })
  );
  return data;
}

const MyList = ({ isOwnedList = true }) => {
  const [cookies] = useCookies();
  const [myLists, setLists] = useState([]);
  const email = cookies.email;
  console.log(myLists);
  useEffect(() => {
    getListsInfo(isOwnedList, email).then((data) => {
      setLists(data.filter((x) => x !== undefined));
    });
  }, [email, isOwnedList]);
  //   console.log(myLists);
  return (
    <div>
      {myLists ? (
        myLists.map((list) => <ListCard movieList={list.data} />)
      ) : (
        <b>Nothing to show here</b>
      )}
    </div>
  );
};

export default MyList;
