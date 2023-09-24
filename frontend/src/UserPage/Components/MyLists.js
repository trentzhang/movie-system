import { Card, Container } from "react-bootstrap";
import { ListCardGroup } from "../../Home/body/ListCardGroup";
import CardHeader from "react-bootstrap/esm/CardHeader";

export function MyListsCard({ lists }) {
  return (
    <Card className="text-dark">
      <CardHeader className="mb-3">My Lists</CardHeader>
      <div className="">
        <ListCardGroup Lists={lists}></ListCardGroup>
      </div>
    </Card>
  );
}
