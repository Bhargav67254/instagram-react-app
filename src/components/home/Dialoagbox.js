import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import styled from "styled-components";
import { useStateValue } from "../Stateprovider";
import { db, store } from "../../firebase";
import firebase from "firebase";
import LinearProgress from "@mui/material/LinearProgress";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const Dialoagbox = ({ open, setOpen }) => {
  const [imageURL, setImageURL] = useState("");
  const [postText, setPostText] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [{ user }] = useStateValue();
  const [progress, setProgress] = useState(0);

  function closeBox() {
    setOpen(false);
  }
  const handleClose = async () => {
    if (!imageURL && !postText) {
      alert(
        "please enter an image or video Url to send post or write whatever comes in your mind "
      );
    } else {
      db.collection("posts").add({
        postImage: imageURL,
        postText: postText,
        postVideo: videoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        email: user.email,
        username: user.displayName,
        photo: user.photoURL,
      });

      setImageURL("");
      setVideoURL("");
      setPostText("");
      setOpen(false);
    }
  };

  function handleChangeFile(e) {
    e.preventDefault();
    if (e.target.files[0]) {
      setImageURL(e.target.files[0]);
    }
  }
  function fileUpload() {
    const uploading = store.ref(`images/${imageURL.name}`).put(imageURL);

    uploading.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        store
          .ref("images")
          .child(imageURL.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              postImage: url,
              postText: postText,
              postVideo: videoURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              email: user.email,
              username: user.displayName,
              photo: user.photoURL,
            });
          })
          .then(() => {
            setOpen(false);
            setProgress(0);
          });
        setImageURL("");
        setVideoURL("");
        setPostText("");
      }
    );
  }

  return (
    <Form>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="IMAGE URL"
            type="url"
            fullWidth
            variant="standard"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Text"
            type="Text"
            fullWidth
            variant="standard"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Vidoe URL"
            type="url"
            fullWidth
            variant="standard"
            value={videoURL}
            placeholder="Optional"
            onChange={(e) => setVideoURL(e.target.value)}
          />
          <Wrapper>
            <Label htmlFor="file">
              <span>
                or choose from file
                <input
                  type="file"
                  id="file"
                  hidden
                  accept="image/*"
                  onChange={handleChangeFile}
                />
              </span>
              <FileIcon />
            </Label>
            <SendIcon onClick={fileUpload} />
          </Wrapper>
          {progress !== 0 && (
            <LinearProgress variant="determinate" value={progress} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Post</Button>
          <Button onClick={closeBox}>discard</Button>
        </DialogActions>
      </Dialog>
    </Form>
  );
};

export default Dialoagbox;

const Form = styled.form``;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin: 20px 20px 20px 0px;
  border: 1px solid gray;
  border-radius: 5px;
  width: fit-content;
  padding: 5px;
  cursor: pointer;
  span {
    font-size: 18px;
    margin-right: 10px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const FileIcon = styled(DriveFileMoveOutlinedIcon)``;
const SendIcon = styled(SendOutlinedIcon)`
  cursor: pointer;
`;
