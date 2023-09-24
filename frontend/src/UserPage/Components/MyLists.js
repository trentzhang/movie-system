import { Card, Container } from "react-bootstrap";
import { ListCardGroup } from "../../Home/body/ListCardGroup";
import CardHeader from "react-bootstrap/esm/CardHeader";
import CreateNewList from "../CreateNewList";

export function MyListsCard({ lists }) {
  return (
    <Card className="text-dark">
      <CardHeader className="mb-3">My Lists</CardHeader>

      <ListCardGroup Lists={lists}></ListCardGroup>

      <CreateNewList></CreateNewList>
    </Card>
  );
}
