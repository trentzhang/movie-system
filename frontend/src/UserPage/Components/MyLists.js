import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useParams } from "react-router";
import { auth } from "../../Authentication/Firebase";
import { ListCardGroup } from "../../Home/body/ListCardGroup";
import CreateNewList from "../CreateNewList";

export function MyListsCard({ lists }) {
  const { email } = useParams();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setLoggedInUser);
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Card className="text-dark mb-3">
        <CardHeader className="mb-3">Created Lists</CardHeader>
        <ListCardGroup Lists={lists}></ListCardGroup>
      </Card>

      {loggedInUser && email === loggedInUser.email ? (
        <Card className="text-dark">
          <CardHeader className="mb-3">Create new list</CardHeader>
          <CreateNewList></CreateNewList>
        </Card>
      ) : null}
    </div>
  );
}
