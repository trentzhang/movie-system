import React, { useState, useEffect } from "react";
import { Modal, Dropdown, Button } from "react-bootstrap";
import { backendUrl } from "../../settings";

export function AddMovieToListModal({
  movie,
  lists,
  show,
  onHide,
  onSuccessAdded,
}) {
  const [selectedListIndex, setSelectedListIndex] = useState(null);

  const handleConfirm = async () => {
    if (!selectedListIndex) {
      alert("Please select a list!");
      return;
    }
    const selectedListId = lists[selectedListIndex].id;
    // Send add movie to list API
    await fetch(`${backendUrl}/list/movie/${selectedListId}/${movie}`, {
      method: "PUT",
    });
    alert("Success!");
    onHide();
    onSuccessAdded();
  };

  // Handle changes in the 'show' prop
  useEffect(() => {
    if (show) {
      // Show the modal when 'show' prop is true
      setSelectedListIndex(null); // Reset selectedListIndex when the modal is shown
    }
  }, [show]);

  useEffect(() => {
    console.log("selectedListIndex :>> ", selectedListIndex);
  }, [selectedListIndex]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add to my list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown
          onSelect={(item) => {
            setSelectedListIndex(item);
          }}
        >
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            {selectedListIndex
              ? lists[selectedListIndex].name
              : "Select a List"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {lists
              ? lists.map((value, index) => {
                  return (
                    <Dropdown.Item key={index} eventKey={index}>
                      {value.name}
                    </Dropdown.Item>
                  );
                })
              : null}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Button onClick={handleConfirm}>Confirm</Button>
    </Modal>
  );
}
