import { Card, Container } from "react-bootstrap";
import { ListCardGroup } from "../../Home/body/ListCardGroup";
import CardHeader from "react-bootstrap/esm/CardHeader";
import CreateNewList from "../CreateNewList";
import { useParams } from "react-router";
import { auth } from "../../Authentication/Firebase";
import { useEffect, useState } from "react";

export function MyListsCard({ lists }) {
  const { email } = useParams();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setLoggedInUser(authUser);
      } else {
        // User is logged out
        setLoggedInUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Card className="text-dark mb-3">
        <CardHeader className="mb-3">Created Lists</CardHeader>
        <ListCardGroup Lists={lists}></ListCardGroup>
      </Card>
      <Card className="text-dark">
        <CardHeader className="mb-3">Create new list</CardHeader>
        {loggedInUser && email === loggedInUser.email ? (
          <CreateNewList></CreateNewList>
        ) : null}
      </Card>
    </div>
  );
}
