import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
// import { useParams } from "react-router-dom";
import { auth, db } from "../LoginRegisterModal/Firebase";
import { ref, set, get, child } from "firebase/database";
import { updatePassword } from "firebase/auth";

class Updateinfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // var/objs to use
      new_username: "",
      new_password: "",
      new_birthday: "",
      new_gender: "",
    };

    // this.handleEmailRegistration = this.handleEmailRegistration.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleBirthday = this.handleBirthday.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this);
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        get(child(ref(db), `users/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            //   console.log(auth.currentUser);
            //   console.log(snapshot.val().birthday);
            this.setState({
              new_birthday: snapshot.val().birthday,
              new_gender: snapshot.val().gender,
              new_username: snapshot.val().username,
            });
          } else {
            console.log("No data available");
          }
        });
      } else {
        // No user is signed in.
      }
    });
  }
  handleUsername(e) {
    this.setState({
      new_username: e.target.value,
    });
  }
  handlePassword(e) {
    this.setState({
      new_password: e.target.value,
    });
  }
  handleBirthday(e) {
    this.setState({
      new_birthday: e.target.value,
    });
  }
  handleGender(e) {
    this.setState({
      new_gender: e.target.value,
    });
  }
  handleSubmit(e) {
    set(ref(db, "users/" + auth.currentUser.uid), {
      gender: this.state.new_gender,
      username: this.state.new_username,
      birthday: this.state.new_birthday,
    }).catch((e) => alert("fail to reset gender/username/birthday"));
    updatePassword(auth.currentUser, this.state.new_password)
      .then()
      .catch((e) => alert("fail to reset password"));
  }
  DeleteUser(e) {}
  render() {
    return (
      <div>
        {/* <Link to=""><button>
                    Back to main page
                </button>
                </Link> */}

        <form id="update" onSubmit={this.handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              New Username
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="New Username"
                value={this.state.new_username}
                onChange={this.handleUsername}
                name="username"
                id="username"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              New Password
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="New Password"
                value={this.state.new_password}
                onChange={this.handlePassword}
                name="Password"
                id="Password"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Gender
            </Form.Label>
            <Col sm={3}>
              <Form.Select
                value={this.state.new_gender}
                onChange={this.handleGender}
              >
                <option value="" disabled selected>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-Binary</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Birthday
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="date"
                value={this.state.new_birthday}
                onChange={this.handleBirthday}
              />
            </Col>
          </Form.Group>
          <div className="mb-2">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
        <div>
          <Button variant="danger" type="submit" onClick={this.DeleteUser}>
            Delete Account
          </Button>
          <br />
        </div>
      </div>
    );
  }
}
export default Updateinfo;
