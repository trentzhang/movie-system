import React from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBBtn } from "mdb-react-ui-kit";
import { genderDefaultAvater } from "../MovieDetailPage/MovieDetail";

const Avater = ({ userData }) => {
  return (
    <MDBCard className="mb-4">
      <MDBCardBody className="text-center">
        <MDBCardImage
          src={
            userData.avatar
              ? userData.avatar
              : genderDefaultAvater(userData.gender)
          }
          alt="avatar"
          className="rounded-circle"
          style={{ width: "150px" }}
          fluid
        />
        <p className="text-muted mb-1">Hey there!</p>

        <div className="d-flex justify-content-center mb-2">
          <MDBBtn>Like, TBD</MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Avater;
