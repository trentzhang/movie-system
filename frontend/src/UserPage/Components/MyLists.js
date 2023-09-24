import { Card } from "react-bootstrap";
import { ListCardGroup } from "../../Home/body/ListCardGroup";

export function MyListsCard({ userData }) {
  console.log("userData :>> ", userData);
  return (
    <Card className="text-dark  mb-3">
      <ListCardGroup Lists={userData.lists}></ListCardGroup>
    </Card>
  );
}
