import React, { useState } from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import Player from "react-player";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { db } from "../../firebase";
import firebase from "firebase";

const Post = ({
  userImage,
  userName,
  postImage,
  postVideo,
  postText,
  comments,
  postArray,
  id,
  timestamp,
  email,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function sendComments() {
    if (!input) {
      alert("pleae type your comment first ");
    } else {
      db.collection("posts")
        .doc(id)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(input),
        });
    }
    setInput("");
  }

  return (
    <>
      <Container>
        {/* ----------------------------------- */}
        <PostHeader>
          <User to={`/profile/${email}`}>
            <UserIcon src={userImage} alt={userName} />
            <span>{userName}</span>
          </User>
          <MoreIcon />
        </PostHeader>
        {/* ------------------------------------- */}

        {/* -------------------------------------- */}
        <PostBody>
          {postImage && <img src={postImage} alt="" />}
          {postVideo && (
            <Player
              url={postVideo}
              loop={true}
              controls={false}
              width={"100%"}
            />
          )}
        </PostBody>
        {/* ------------------------------------- */}

        <PostDetails>
          {/* --------------------------------------- */}
          <PostDetailsHeader>
            <Icon>
              {isLiked === false ? (
                <HeartIcon onClick={() => setIsLiked(true)} />
              ) : (
                <HeartFillIcon onClick={() => setIsLiked(false)} />
              )}
              <MessageIcon onClick={handleClickOpen} />
              <SendIcon />
            </Icon>
            <SaveIcon />
          </PostDetailsHeader>
          {/* ------------------------------ */}
          <PostDetailsBody>
            <p>
              <span>{userName}</span> {postText}
            </p>
            <small>{new Date(timestamp?.toDate()).toUTCString()}</small>
            <br />
            {comments ? (
              <span onClick={handleClickOpen}>
                {`View all ${comments} comments `}
              </span>
            ) : (
              <span onClick={handleClickOpen}>{` 0 comments `}</span>
            )}
          </PostDetailsBody>
        </PostDetails>
        {/* --------------------------------------------------------------------------------- */}

        <Dialog open={open} onClose={handleClose}>
          <Comments>
            {postArray &&
              postArray.map((comment) => {
                return (
                  <CommentsData>
                    <p>{comment}</p>
                  </CommentsData>
                );
              })}
          </Comments>
          <Wrapper>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Comments"
              type="email"
              fullWidth
              variant="standard"
              style={{ marginRight: "10px" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <SendIcon
              onClick={sendComments}
              style={{ fontSize: "30", marginTop: "45" }}
            />
          </Wrapper>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Post;

const Container = styled.div`
  border: 1px solid lightgray;
  margin-bottom: 20px;
  background-color: white;
  padding-bottom: 10px;
  border-radius: 5px;
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px 0px 15px;
`;
const User = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;
const UserIcon = styled(Avatar)`
  margin-right: 10px;
  cursor: pointer;
  width: 30px !important;
  height: 30px !important;
`;
const MoreIcon = styled(MoreHorizIcon)`
  cursor: pointer;
`;

const PostBody = styled.div`
  margin: 10px 0px;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;
const PostDetails = styled.div``;
const PostDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    margin: 0px 10px;
    margin-bottom: 10px;
  }
`;
const Icon = styled.div`
  svg {
    margin: 0px 10px;
    margin-bottom: 10px;
  }
`;
const HeartIcon = styled(FavoriteBorderOutlinedIcon)`
  font-size: 20px;
  cursor: pointer;
`;
const HeartFillIcon = styled(FavoriteIcon)`
  font-size: 20px;
  cursor: pointer;
  color: #ed4956 !important;
`;
const MessageIcon = styled(MessageOutlinedIcon)`
  font-size: 20px;
  cursor: pointer;
`;
const SendIcon = styled(SendOutlinedIcon)`
  font-size: 20px;
  cursor: pointer;
`;
const SaveIcon = styled(BookmarkBorderOutlinedIcon)`
  font-size: 20px;
  cursor: pointer;
`;
const PostDetailsBody = styled.div`
  padding: 0px 10px;
  p {
    font-weight: 400;
    margin-bottom: 5px;
    span {
      font-weight: bold !important;
      font-size: 15px;
      color: black;
    }
  }
  small {
    color: gray;
  }
  span {
    font-size: 13px;
    color: gray;
    cursor: pointer;
  }
`;

const Wrapper = styled(DialogContent)`
  display: flex;
  align-items: center;
`;
const Comments = styled.div``;
const CommentsData = styled.div`
  padding: 0px 10px;
  p {
    margin: 5px 20px;
  }
`;
