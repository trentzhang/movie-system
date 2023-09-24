import React from "react";

import { Col, Card, Row } from "react-bootstrap";

const BasicInfo = ({ username, email, gender, birthday }) => {
  const InfoRow = ({ label, data }) => (
    <Row>
      <Col xs={4}>{label}</Col>
      <Col>{data}</Col>
    </Row>
  );

  return (
    <Card className="p-3 text-dark mb-3">
      <InfoRow label="username" data={username}></InfoRow>
      <hr />
      <InfoRow label="email" data={email} />
      <hr />
      <InfoRow label="gender" data={gender} />
      <hr />
      <InfoRow label="birthday" data={birthday} />
    </Card>
  );
};

export default BasicInfo;
