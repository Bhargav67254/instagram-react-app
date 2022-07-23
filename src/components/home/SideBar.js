import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import LoginUsers from "./LoginUsers";
import { auth, db } from "../../firebase";
import { useStateValue } from "../Stateprovider";
import { Link } from "react-router-dom";
const SideBar = () => {
  const [{ user }] = useStateValue();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    db.collection("user").onSnapshot((response) => {
      setUserList(
        response.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  }, []);

  function Logout() {
    auth.signOut();
  }

  return (
    <Container>
      <MainUser>
        <User to={`/${user.email}`}>
          <UserIcon src={user.photoURL} alt={user.displayName} />
          <p>{user.displayName}</p>
        </User>
        <span onClick={Logout}>Log out</span>
      </MainUser>
      <p>Suggestions For You</p>
      <UserList>
        {userList.map((loginuser) => {
          return (
            <>
              {user.displayName !== loginuser?.data?.username && (
                <LoginUsers
                  key={loginuser.id}
                  username={loginuser.data.username}
                  photo={loginuser.data.photo}
                  email={loginuser.data.email}
                />
              )}
            </>
          );
        })}
      </UserList>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  align-items: flex-start;
  p {
    font-size: 15px;
    font-weight: 500;
    margin: 10px auto;
    color: gray;
  }
  @media screen and (max-width: 890px) {
    display: none;
  }
`;
const MainUser = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: #7ec8f8;
    font-weight: 500;
    cursor: pointer;
  }
`;
const User = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  p {
    font-size: 15px;
    font-weight: 500;
    color: black;
  }
`;
const UserIcon = styled(Avatar)`
  margin-right: 10px;
  cursor: pointer;
`;
const UserList = styled.div`
  width: 100%;
`;
// const Profiles = styled(Link)`
//   text-decoration: none;
// `;
