import React from "react";
import styled from "styled-components";
import Feed from "../components/home/Feed";
import SideBar from "../components/home/SideBar";

const HomePage = () => {
  return (
    <Container>
      <Feed />
      <SideBar />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  width: 70%;
  display: flex;
  @media screen and (max-width: 650px) {
    width: 90%;
  }
`;
