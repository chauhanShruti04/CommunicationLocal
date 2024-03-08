import React, { useEffect, useRef, useState } from "react";
import { EditDocumentPopup } from "../../Popup/EditDocumentPopup";
import ManageDocumentTable from "./ManageDocumentTable";
import { DeletePopup } from "../../Popup/DeletePopup";
import { getLocalStorage, setLocalStorage } from "../../Common/Storage";
import { FileUploadPopup } from "../../Popup/FileUploadPopup";
import ShareFile from "./ShareFile";
import { SharePopup } from "../../Popup/SharePopup";
import swal from "sweetalert";


const ManageDocument = () => {

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [addShareOpen, setAddShareOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [dropDownValue, setDropDownValue] = useState("");
  const [dropDownData, setDropDownData] = useState([]);
  const [sharedUserList, setSharedUserList] = useState([]);
  const [isGoBack, setIsGoBack] = useState(false);
  const [removePopup, setRemovePopup] = useState(false);
  const [singleRemoveFile, setSingleRemoveFile] = useState({});
  const [errorAddUpload, setErrorAddUpload] = useState({
    label: "",
    fileUpload: "",
  });
  const [fileName, setFileName] = useState("");
  const [fileLabel, setFileLabel] = useState("");
  const [slectedRowData, setSelectedRowData] = useState({});
  const [userData, setUserData] = useState([]);
  const [Upload, setUpload] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [sharedFiles, setSharedFiles] = useState([]);

  let shareInstance = useRef();



  const handleLabelChange = (e) => {
    setFileLabel(e.target.value);
    setErrorAddUpload((prev) => ({
      ...prev,
      label: e.target.value ? "" : "This Field Can't Be Blank",
    }));
  };

  const handleFileChange = (e) => {
    setFileName(e.target.value.split("\\").pop());
    setErrorAddUpload((prev) => ({
      ...prev,
      fileUpload: e.target.value ? "" : "This Field Can't Be Blank",
    }));
  };

  const handleRemovePopupClose = () => {
    setRemovePopup(false);
    setSingleRemoveFile({});
  };



  const handleDropDownChange = (e) => {
    setDropDownValue(e.target.text);
  };

  const handleChange = (e) => {
    const obj = { ...selectedData };
    obj.label = e.target.value;
    setErrorAddUpload((prev) => ({
      ...prev,
      label: e.target.value ? "" : "This Field Can't Be Blank",
    }));
    setSelectedData(obj);
  };

  useEffect(() => {
    const shareduser = Upload.filter(
      (x) => x.fileName === selectedData.fileName
    );

    const storedUpload = getLocalStorage("Upload")
      ? JSON.parse(getLocalStorage("Upload"))
      : [];
    const loggedInUser = getLocalStorage("loggedInUser")
      ? JSON.parse(getLocalStorage("loggedInUser"))
      : [];
    const storedUsers = getLocalStorage("userData")
      ? JSON.parse(getLocalStorage("userData"))
      : [];
    const shared_files = getLocalStorage("sharedFiles")
      ? JSON.parse(getLocalStorage("sharedFiles"))
      : [];

    const data = storedUsers.filter((item) => item.id !== loggedInUser[0].id);

    setSharedUserList(shareduser);
    setDropDownData(data);
    setSharedFiles(shared_files);
    setUpload(storedUpload);
    setLoggedInUser(loggedInUser);
  }, []);

  const handleOpenRemovePopup = (args) => {
    setRemovePopup(true);
    setSingleRemoveFile(args);
  };

  const toggleDelete = () => {
    let matchIndex = sharedFiles.findIndex(
      (val) =>
        val.id === singleRemoveFile.id &&
        val.fileDetail === singleRemoveFile.fileDetail &&
        val.shareName === singleRemoveFile.shareName &&
        val.filename === singleRemoveFile.filename &&
        val.shareToid === singleRemoveFile.shareToid &&
        val.sharedby === singleRemoveFile.sharedby
    );

    if (matchIndex > -1) {
      setSharedFiles([...sharedFiles]);
      sharedFiles.splice(matchIndex, 1);
      setLocalStorage("sharedFiles", sharedFiles);
      handleRemovePopupClose();
    }
  };

  const validateEditForm = (newFileName) => {
    let formIsValid = true;
    if (newFileName == "") {
      formIsValid = false;
      setErrorAddUpload((prev) => ({
        ...prev,
        label: "This Field Can't Be Blank",
      }));
    }

    return formIsValid;
  };

  const handleEditSave = (newFileName) => {
    if (validateEditForm(newFileName)) {
      const updatedUpload = Upload.map((item) => {
        if (item.id == selectedData?.id) {
          item.label = newFileName;
        }
        return item;
      });
      setLocalStorage("Upload", updatedUpload);
      setEditOpen(false);
    }
  };

  const handleEdit = (item) => {
    setEditOpen(true);
    setSelectedData(item);
  };

  const closePopUp = () => {
    setDeleteOpen(false);
    setEditOpen(false);
    setFileUploadOpen(false);
    setSelectedRowData({})
    if (fileLabel) {
      setFileName("");
      setFileLabel("");
    }
    if (errorAddUpload.label != "") {
      setErrorAddUpload({
        label: "",
        fileUpload: "",
      });
    }
  };

  const handleShare = (item) => {
    setShareOpen(true);
    setSelectedData(item);
  };

  const handleDelete = () => {
    const updatedUsers = Upload.filter((user) => user.id !== selectedData.id);
    setUpload(updatedUsers);
    setLocalStorage("Upload", updatedUsers);
    setDeleteOpen(false);


  };

  const handleFileUpload = () => {
    setFileUploadOpen(true);
  };

  const validateForm = () => {
    let formIsValid = true;
    if (fileLabel === "") {
      formIsValid = false;
      setErrorAddUpload((prev) => ({
        ...prev,
        label: "This Field Can't Be Blank",
      }));
    }
    if (fileName === "") {
      formIsValid = false;
      setErrorAddUpload((prev) => ({
        ...prev,
        fileUpload: "This Field Can't Be Blank",
      }));
    }
    return formIsValid;
  };

  const handleAddUpload = () => {
    if (validateForm()) {
      const finalData = {
        id: Upload.length + 1,
        userid: loggedInUser[0].id,
        label: fileLabel,
        fileName: fileName,
        sharedBy: loggedInUser[0].email,
        sharedTo: "",
      };
      Upload.push(finalData);
      setLocalStorage("Upload", Upload);
      setFileUploadOpen(false);
      setFileName("");
      setFileLabel("");
    }
  };

  const handelAddShare = () => {
    if (shareInstance.current) {
      if (shareInstance.current.value) {
        let inputString = shareInstance.current.value;

        const [shareId, sharename] = inputString.split('""');
        const payload = {
          id: loggedInUser[0].id,
          filename: selectedData.label,
          fileDetail: selectedData.fileName,
          shareToid: parseInt(shareId),
          shareName: sharename,
          sharedby: loggedInUser[0].username,
        };

        const isAlreadyShared = sharedFiles.some(
          (share) =>
            share.filename === selectedData.label &&
            share.shareToid === payload.shareToid
        );
        if (isAlreadyShared) {
          swal('Oops!', 'File already shared with the selected user', 'error');
          return;
        } else {
          sharedFiles.push({ ...payload });
          setSharedFiles([...sharedFiles]);
          setLocalStorage("sharedFiles", sharedFiles)
        }
        setSharedFiles([...sharedFiles]);
        setLocalStorage("sharedFiles", sharedFiles)
      }
    }
  };

  const handleAddShareConfirm = () => {
    const finalData = {
      ...selectedData,
      sharedTo: dropDownValue,
      id: Upload.length + 1,
    };
    Upload.push(finalData);
    setLocalStorage("Upload", Upload);
    setAddShareOpen(false);
  };

  const dropOption = () => {
    return dropDownData.map((val) => {
      return (
        <option value={`${val.id} "" ${val.username}`}>{val.username}</option>
      );
    });
  };

  const handleREmovePopupOpen = (args) => {
    setDeleteOpen(true)
    setSelectedRowData(args)
  }

  const handleDocDelete = () => {

    let newData = Upload.filter((val) => val.id !== slectedRowData.id && val.label !== slectedRowData.label && val.fileName !== slectedRowData.fileName)
    localStorage.setItem("Upload", JSON.stringify(newData.length > 0 ? newData : []));
    if (newData.length > 0) {
      setUpload([...newData])
    } else {
      setUpload([])
    }

    closePopUp()
  }

  return (
    <>
      {!shareOpen && (
        <ManageDocumentTable
          handleEdit={handleEdit}
          toggleDelete={handleDocDelete}
          handleShare={handleShare}
          handleFileUpload={handleFileUpload}
          Upload={Upload}
          loggedInUser={loggedInUser}
          sharedFiles={sharedFiles}
          handleREmovePopupOpen={handleREmovePopupOpen}
        />
      )}

      <EditDocumentPopup
        editOpen={editOpen}
        closePopUp={closePopUp}
        handleEditSave={handleEditSave}
        selectedData={selectedData}
        handleChange={handleChange}
        errorAddUpload={errorAddUpload}
      />

      <DeletePopup
        closePopUp={closePopUp}
        open={deleteOpen}
        handleDelete={handleDocDelete}
      />
      <DeletePopup
        closePopUp={handleRemovePopupClose}
        open={removePopup}
        handleDelete={toggleDelete}
      />

      <SharePopup
        closePopUp={closePopUp}
        open={addShareOpen}
        handleAddShareConfirm={handleAddShareConfirm}
      />

      <FileUploadPopup
        fileUploadOpen={fileUploadOpen}
        closePopUp={closePopUp}
        handleAddUpload={handleAddUpload}
        errorAddUpload={errorAddUpload}
        fileName={fileName}
        fileLabel={fileLabel}
        handleLabelChange={handleLabelChange}
        handleFileChange={handleFileChange}
      />

      {shareOpen && !isGoBack && (
        <ShareFile
          Upload={Upload}
          selectedData={selectedData}
          toggleDelete={toggleDelete}
          handelAddShare={handelAddShare}
          dropDownData={dropDownData}
          sharedUserList={sharedUserList}
          setIsGoBack={setIsGoBack}
          handleDropDownChange={handleDropDownChange}
          dropDownValue={dropDownValue}
          shareInstance={shareInstance}
          dropOption={dropOption}
          sharedFiles={sharedFiles}
          setShareOpen={setShareOpen}
          loggedInUser={loggedInUser}
          handleOpenRemovePopup={handleOpenRemovePopup}
        />
      )}
    </>
  );
};

export default ManageDocument;
