import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";


const ManageDocumentTable = ({
  handleEdit,
  handleREmovePopupOpen,
  handleShare,
  handleFileUpload,
  Upload,
  loggedInUser,
  sharedFiles,
}) => {
  const [myUpload, setMyUpload] = useState([]);
  const [sharedUpload, setSharedUpload] = useState([]);

  useEffect(() => {
    const myUpload = Upload.filter((x) => x.userid === loggedInUser[0].id);
    const sharedUpload = Upload.filter(
      (x) => x.sharedTo === loggedInUser[0].email
    );
    setMyUpload(myUpload);
    setSharedUpload(sharedUpload);
  }, [handleFileUpload]);

  return (
    <>
      <div>
        <h1 className="heading">My Uploads</h1>
      </div>
      <div>
        <Table bordered hover className="customTable">
          <thead>
            <tr>
              <th scope="col">Label</th>
              <th scope="col">File Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {myUpload.length > 0 ? (
              myUpload.map((item) => (
                <tr>
                  <td>{item.label}</td>
                  <td>{item.fileName}</td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      <Button
                        variant="outline-dark"
                        className="btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-dark"
                        className="btn"
                        onClick={() => handleREmovePopupOpen(item)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outline-dark"
                        className="btn"
                        onClick={() => handleShare(item)}
                      >
                        Share
                      </Button>
                    </div>
                  </td>
                </tr>
              ))) : (
              <span className="span">NO RECORD FOUND TO DISPLAY</span>
            )}

          </tbody>
        </Table>
      </div>

      <div>
        <h1 className="heading">Shared Uploads</h1>
      </div>
      <div>
        <Table bordered hover className="customTable">
          <thead>
            <tr>
              <th scope="col">Label</th>
              <th scope="col">File Name</th>
              <th scope="col">Shared By</th>
            </tr>
          </thead>
          <tbody>
            {sharedFiles.length > 0 ? (
              sharedFiles.map((item) =>
                loggedInUser[0].id === item.shareToid ? (
                  <tr>
                    <td>{item.filename}</td>
                    <td>{item.fileDetail}</td>
                    <td>{item.sharedby}</td>
                  </tr>
                ) : null
              )
            ) : (<span className="span">NO SHARED RECORD FOUND TO DISPLAY</span>)
            }
          </tbody>
        </Table>
      </div>

      <div>
        <Button color="primary" onClick={handleFileUpload}>
          {" "}
          + Add Upload
        </Button>
      </div>
    </>
  );
};

export default ManageDocumentTable;
