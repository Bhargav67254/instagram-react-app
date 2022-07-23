import React from "react";
import styled from "styled-components";
import LeftLoginPage from "../components/login/LeftLoginPage";
import RightLoginPage from "../components/login/RightLoginPage";

const LoginPage = () => {
  return (
    <Components>
      <LeftLoginPage />
      <RightLoginPage />
    </Components>
  );
};

export default LoginPage;

const Components = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
  @media screen and (max-width: 650px) {
    padding: 0px 10px;
  }
`;
