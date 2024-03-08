import React from "react";
// import { Button } from "@mui/material";
import { Button, Table } from "react-bootstrap";
import { Col, Row } from "reactstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

export const ShareFile = ({
  selectedData,
  toggleDelete,
  handelAddShare,
  sharedFiles,
  sharedUserList,
  setIsGoBack,
  handleDropDownChange,
  dropDownValue,
  shareInstance,
  dropOption,
  setShareOpen,
  loggedInUser,
  handleOpenRemovePopup,
}) => {
  return (
    <div>
      <div style={{ width: "20%" }} onClick={() => setShareOpen(false)}>
        <span className="left-arrow" style={{ marginLeft: "20px" }}></span>
        <span className="go_back" >
          Go Back
        </span>
      </div>
      <div>
        <div>
          <h1 style={{marginBottom: "15px"}}> Upload Sharing : {selectedData.fileName}</h1>
        </div>
        <div>
          <Table bordered hover className="customTable">
            <thead>
              <tr>
                <th scope="col">Shared User</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {sharedFiles.length > 0 ? (
                sharedFiles.map((item, index) =>
                  loggedInUser[0].id === item.id &&
                    item.fileDetail === selectedData.fileName ? (
                    <tr key={index}>
                      <td>{item.shareName}</td>
                      <td>
                        <IconButton aria-label="delete" onClick={() => handleOpenRemovePopup(item)}>
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ) : null
                )
              ) : (<span className="span">NOT SHARED WITH ANYONE</span>)
              }

            </tbody>
          </Table>
        </div>
      </div>

      <div>
        <div>
          <h1> Add Sharing </h1>
        </div>

        <Row>
          {/* <Col xl={6} lg={6} md={12} sm={12} xs={12} style={{ display: "flex", paddingTop: "5px", marginTop: "10px" }} > */}
          <span className="choose_user" >
            {" "}
            Choose User :{" "}
          </span>

          <div>
            <select className="user_list"
              name="userlist"
              ref={shareInstance}
            >
              {dropOption()}
            </select>

            <Button variant="outline-dark" onClick={() => handelAddShare()}>
              Add Share
            </Button>
          </div>
          {/* </Col> */}
        </Row>
      </div>
    </div>
  );
};

export default ShareFile;
