import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginUsers = ({ username, photo, email }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <Container>
      <Link to={`profile/${email}`} style={{ textDecoration: "none" }}>
        <User>
          <UserIcon src={photo} alt={username} />
          <p>{username}</p>
        </User>
      </Link>
      {isFollowing === false ? (
        <span onClick={() => setIsFollowing(true)}>Follow</span>
      ) : (
        <span onClick={() => setIsFollowing(false)}>Following</span>
      )}
    </Container>
  );
};

export default LoginUsers;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
  span {
    color: #7ec8f8;
    font-weight: 500;
    cursor: pointer;
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 15px;
    font-weight: 500;
    color: black !important;
  }
`;
const UserIcon = styled(Avatar)`
  margin-right: 10px;
  cursor: pointer;
`;
