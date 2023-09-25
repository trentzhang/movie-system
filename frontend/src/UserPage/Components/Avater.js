import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import React from "react";
import { genderDefaultAvater } from "../../MovieDetailPage/MovieDetail";

const Avater = ({ avatar, gender }) => {
  return (
    <MDBCard className="mb-3 text-center">
      <MDBCardBody>
        <MDBCardImage
          src={avatar ? avatar : genderDefaultAvater(gender)}
          alt="avatar"
          className="rounded-circle w-50"
          fluid
        />
        <p className="text-muted">Hey there!</p>

        <div className="d-flex justify-content-center">
          {/* TODO: Like User Page */}
          {/* <MDBBtn>Like, TODO</MDBBtn> */}
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Avater;
