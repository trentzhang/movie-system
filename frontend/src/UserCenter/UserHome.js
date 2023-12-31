// this file will contains the personal info of user, including user's own list, user's fav list
import { Tab, Row, Col, Nav, Stack } from "react-bootstrap";
import Header from "../Header/Header.js";
import React from "react";
import Updateinfo from "./UpdateinfoTab.js";
// import Mydisplay from "./Mylistdisplay.js";
// import Favlistdisplay from "./Favlistdisplay.js";
// import MyOwnListsTab from "./MyOwnListsTab.js";
class UserHome extends React.Component {
  render() {
    return (
      <Stack gap={3}>
        <Header />
        <div>
          {/* <Button
            variant="secondary position-absolute top-0 end-0"
            href="/home"
          >
            Back to homepage
          </Button> */}

          <Tab.Container id="left-tabs" defaultActiveKey="info">
            <Row>
              <Col>
                <Nav justify>
                  <Nav.Item>
                    <Nav.Link eventKey="info" className="text-light">
                      Update Your Information
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="info">
                    <Updateinfo />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Stack>
    );
  }
}
export default UserHome;
