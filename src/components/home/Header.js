import React from "react";
import styled from "styled-components";
import SerachIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Avatar from "@mui/material/Avatar";
import { useStateValue } from "../Stateprovider";
import Dialoagbox from "./Dialoagbox";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [{ user }] = useStateValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Container>
      <Wrapper>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <img src="1.png" alt="" />
        </Link>
        <RightHeader>
          <SearchBar>
            <Search />
            <input type="text" name="" id="" placeholder="Search" />
          </SearchBar>
          <Icons>
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              <Home />
            </Link>
            <Send />
            <PlusIcon onClick={handleClickOpen} />
            <CompasIcon />
            <HeartIcon />
          </Icons>
          <Link to={`/${user.displayName}`} style={{ textDecoration: "none" }}>
            <UserIcon src={user.photoURL} alt={user.displayName} />
          </Link>
        </RightHeader>
        <Dialoagbox open={open} setOpen={setOpen} />
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: white !important;
  padding: 5px 20px;
  border-bottom: 1px solid lightgray;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 60%;

  img {
    width: 100px;
  }
  @media screen and (max-width: 750px) {
    width: 100%;
  }
  @media screen and (max-width: 420px) {
    justify-content: center;
  }
`;

const RightHeader = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  @media screen and (max-width: 420px) {
    position: fixed;
    background-color: black;
    color: white;
    bottom: 0px;
    padding: 10px;
    left: 0;
    justify-content: center;
    right: 0;
  }
`;
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #efefef;
  border-radius: 10px;
  padding: 0px 10px;
  justify-content: center;
  color: gray;
  margin-right: 20px;
  margin-left: 10px;
  @media screen and (max-width: 910px) {
    display: none;
  }
  input {
    background: transparent;
    border: none;
    padding: 8px 10px;
    outline: none;
    color: gray;
  }
`;
const Search = styled(SerachIcon)`
  cursor: pointer;
`;
const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-decoration: none;
  svg {
    margin: 0px 10px;
  }

  @media screen and (max-width: 420px) {
    justify-content: center;
  }
`;
const Home = styled(HomeOutlinedIcon)`
  font-size: 25px;
  cursor: pointer;
`;
const Send = styled(SendOutlinedIcon)`
  font-size: 25px;
  cursor: pointer;
`;
const PlusIcon = styled(AddBoxOutlinedIcon)`
  font-size: 25px;
  cursor: pointer;
`;
const CompasIcon = styled(ExploreOutlinedIcon)`
  font-size: 25px;
  cursor: pointer;
`;
const HeartIcon = styled(FavoriteBorderOutlinedIcon)`
  font-size: 25px;
  cursor: pointer;
`;
const UserIcon = styled(Avatar)`
  width: 30px !important;
  height: 30px !important;
  cursor: pointer;
  margin: 0px 10px !important;
`;
