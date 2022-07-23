import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "./Post";
import { db } from "../../firebase";

const Feed = () => {
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((response) => {
        setUserPost(
          response.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  return (
    <Container>
      {userPost.length > 0 &&
        userPost.map((post) => {
          return (
            <>
              <Post
                key={post.id}
                id={post.id}
                userImage={post.data.photo}
                userName={post.data.username}
                postImage={post.data.postImage}
                postText={post.data.postText}
                comments={post.data.comments?.length}
                postArray={post.data.comments}
                timestamp={post.data.timestamp}
                email={post.data.email}
              />
            </>
          );
        })}
    </Container>
  );
};

export default Feed;

const Container = styled.div`
  width: 60%;
  margin-right: 10px;
  @media screen and (max-width: 890px) {
    width: 100%;
    margin: 0 auto;
  }
`;
