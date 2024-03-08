import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const FileUploadPopup = ({
  fileUploadOpen,
  closePopUp,
  handleAddUpload,
  errorAddUpload,
  fileName,
  fileLabel,
  handleLabelChange,
  handleFileChange,
}) => {
  // const [fileName, setFileName] = useState("");
  // const [fileLabel, setFileLabel] = useState("");

  // const handleLabelChange = (e) => {
  //   setFileLabel(e.target.value);
  // };
  // const handleFileChange = (e) => {
  //   setFileName(e.target.value.split("\\").pop());
  // };
  return (
    <div>
      <Modal isOpen={fileUploadOpen} toggle={closePopUp}>
        <ModalHeader>Add Upload</ModalHeader>
        <ModalBody>
          <div>
            <label htmlFor="label">File Description: </label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                id="label"
                value={fileLabel}
                onChange={handleLabelChange}
              />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errorAddUpload.label}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="file">Choose File:</label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                style={{ border: "2px solid black" }}
              />
              <span style={{ color: "red", fontSize: "15px" }}>
                {errorAddUpload.fileUpload}
              </span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleAddUpload()}>
            Upload
          </Button>
          <Button color="secondary" onClick={closePopUp}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
