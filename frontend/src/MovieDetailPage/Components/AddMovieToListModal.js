import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";

export function AddMovieToListModal(show, setShow, movie, lists) {
  const [selectedList, setSelectedList] = useState(null);

  //   const handleConfirm = () => {
  //     //   send add movie to list api
  //     fetch(`${backendUrl}/list/movie/${list_id}`);
  //   };
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add to my list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown
          onSelect={(item) => {
            setSelectedList(item);
          }}
        >
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            {selectedList ? selectedList : "Select an List"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {lists.map((value, index) => {
              return (
                <Dropdown.Item key={index} eventKey={value}>
                  {value.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Button>Confirm</Button>
    </Modal>
  );
}
