import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../components/Stateprovider";
import { db } from "../firebase";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    async function GetData() {
      const response = await db
        .collection("posts")
        .where("email", "==", user.email)
        .get();

      const result = response.docs.map((item) => ({
        ...item.data(),
        id: item.id,
        data: item.data(),
      }));
      const newdata = result.map((data) => {
        setUserInfo(data);
      });
      return newdata;
    }
    return GetData();
  }, [user.email]);

  useEffect(() => {
    async function GetData() {
      const response = await db
        .collection("posts")
        .where("email", "==", user.email)
        .get();

      const result = response.docs.map((item) => ({
        ...item.data(),
        id: item.id,
        data: item.data(),
      }));
      setUserPosts(result);
    }
    return GetData();
  }, [user.email]);

  return (
    <Components>
      <Head>
        <UserIcon src={userInfo?.photo} />

        <UserInfo>
          <Header>
            <p>{userInfo?.username}</p>
            <Exit />
          </Header>
          <p>{userPosts?.length} posts</p>
        </UserInfo>
      </Head>
      <hr />
      <UserPosts>
        {userPosts.map((post) => {
          return (
            <>
              <img src={post.postImage} alt="" key={post.id} />
            </>
          );
        })}
      </UserPosts>
    </Components>
  );
};

export default ProfilePage;

const Components = styled.div`
  width: 80%;
  hr {
    margin: 50px 0px 20px 0px;
  }
`;
const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const UserIcon = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  margin-right: 20px;
`;
const UserInfo = styled.div`
  p {
    margin: 10px 0px;
    font-size: 15px;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-right: 20px;
    font-size: 30px;
    font-weight: 300;
  }
`;
const Exit = styled(ExitToAppIcon)`
  font-size: 30px !important;
  cursor: pointer;
`;
const UserPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  img {
    width: 300px;
    object-fit: contain;
    margin: 10px;
  }
`;
