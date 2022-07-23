import React from "react";
import styled from "styled-components";

const LeftLoginPage = () => {
  return (
    <Container>
      <img src="2.png" alt="" />
      <Wrap>
        <img src="images/1.jpg" alt="" />
      </Wrap>
    </Container>
  );
};

export default LeftLoginPage;

const Container = styled.div`
  position: relative;
  img {
    width: 100%;
  }
  @media screen and (max-width: 830px) {
    display: none;
  }
`;
const Wrap = styled.div`
  position: absolute;
  top: 14%;
  right: 15%;
  img {
    width: 105%;
    object-fit: contain;
  }
`;
