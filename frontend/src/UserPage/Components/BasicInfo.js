import React from "react";

import { Col, Card, Row } from "react-bootstrap";

const BasicInfo = ({ userData }) => {
  const InfoRow = ({ label, data }) => (
    <Row>
      <Col xs={4}>{label}</Col>
      <Col>{data}</Col>
    </Row>
  );
  const mappedArray = Object.keys(userData).map((label) => {
    const value = userData[label];
    return { label, value };
  });

  return (
    <Card className="p-3 text-dark mb-3">
      <InfoRow label="username" data={userData.username}></InfoRow>
      <hr />
      <InfoRow label="email" data={userData.email} />
      <hr />
      <InfoRow label="gender" data={userData.gender} />
      <hr />
      <InfoRow label="birthday" data={userData.birthday} />
    </Card>
  );
};

export default BasicInfo;
