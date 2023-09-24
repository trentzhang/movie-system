import React from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBBtn } from "mdb-react-ui-kit";
import { genderDefaultAvater } from "../MovieDetailPage/MovieDetail";

const Avater = ({ userData }) => {
  return (
    <MDBCard className="mb-3 text-center">
      <MDBCardBody>
        <MDBCardImage
          src={
            userData.avatar
              ? userData.avatar
              : genderDefaultAvater(userData.gender)
          }
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
