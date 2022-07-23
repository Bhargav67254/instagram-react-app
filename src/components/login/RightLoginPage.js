import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useStateValue } from "../Stateprovider";
import { auth, provider, db } from "../../firebase";
import { useHistory } from "react-router-dom";

const RightLoginPage = () => {
  const [isUserExist, setIsUserExist] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [avatar, setAvatar] = useState("");
  const history = useHistory();

  useEffect(() => {
    setAvatar(Math.floor(Math.random() * 500000));
  }, []);

  function GoogleLogin() {
    auth
      .signInWithPopup(provider)
      .then((response) => {
        dispatch({
          type: "SET_NEW_USER",
          user: response.user,
        });

        history.push("/");
      })
      .catch((error) => alert(error));
  }
  function CreateUserWithEmailAndPassword(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((response) => {
        response.user
          .updateProfile({
            displayName: userName,
          })
          .then(() => {
            setIsUserExist(true);
          });
      })
      .catch((error) => alert(error));

    setUserEmail("");
    setUserName("");
    setUserFullName("");
    setUserPassword("");
  }
  function LoginwithEmailAndPassword(e) {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((response) => {
        dispatch({
          type: "SET_NEW_USER",
          user: response.user,
        });
        history.push("/");
      })
      .catch((error) => alert(error));

    setUserEmail("");
    setUserPassword("");
  }

  return (
    <Container>
      <TopPage>
        <img src="1.png" alt="" />
        {isUserExist === false ? (
          <h3>Sign up to see photos and videos from your friends.</h3>
        ) : (
          <h3>Log in With Your Email And Password</h3>
        )}
        <GoogleLoginButton onClick={GoogleLogin}>
          <img src="3.png" alt="" />
          Log in With Google
        </GoogleLoginButton>
        <h3>OR</h3>
        {isUserExist === false ? (
          <SignupForm>
            <input
              type="email"
              placeholder="Email"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Full Name"
              required={true}
              value={userFullName}
              onChange={(e) => setUserFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              required={true}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required={true}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <button
              type="submit"
              hidden
              onClick={CreateUserWithEmailAndPassword}
            ></button>
            <SignupButton onClick={CreateUserWithEmailAndPassword}>
              Sign up
            </SignupButton>
          </SignupForm>
        ) : (
          <SignupForm>
            <input
              type="email"
              placeholder="Email"
              required={true}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required={true}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <button
              type="submit"
              hidden
              onClick={LoginwithEmailAndPassword}
            ></button>
            <SigninButton onClick={LoginwithEmailAndPassword}>
              Log in
            </SigninButton>
          </SignupForm>
        )}
      </TopPage>

      <BottomPage>
        {isUserExist === false ? (
          <p>
            Have an account?
            <span onClick={() => setIsUserExist(true)}> Log in</span>
          </p>
        ) : (
          <p>
            Don't Have an account?
            <span onClick={() => setIsUserExist(false)}> Sign up</span>
          </p>
        )}
      </BottomPage>
    </Container>
  );
};

export default RightLoginPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 20px;
`;

const TopPage = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  min-width: 300px;
  border: 1px solid lightgray;
  img {
    width: 200px;
    object-fit: contain;
  }
  h3 {
    color: gray;
    text-align: center;
    letter-spacing: 1.2px;
    font-size: 15px;
    margin: 5px 0px;
    font-weight: 500;
    width: 270px;
  }
`;
const GoogleLoginButton = styled(Button)`
  background-color: #0095f6 !important;
  color: white !important;
  letter-spacing: 1.2px !important;
  margin: 10px 0px !important;
  padding: 8px 10px !important;
  width: 270px !important;
  font-weight: 600 !important;
  text-transform: inherit !important;
  font-size: 15px !important;
  :hover {
    background-color: #b2dffc !important;
  }

  img {
    width: 25px;
    object-fit: contain;
    background-color: #b2dffc;
    border-radius: 100%;
    margin-right: 10px;
  }
`;
const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 270px;
  input {
    padding: 8px 10px;
    margin: 10px 0px;
    outline: none;
    border: 1px solid lightgray;
    border-radius: 5px;
    width: inherit;
  }
`;
const SignupButton = styled(Button)`
  color: white !important;
  letter-spacing: 1.2px !important;
  margin: 10px 0px !important;
  padding: 8px 10px !important;
  width: 270px !important;
  font-weight: 600 !important;
  text-transform: inherit !important;
  font-size: 15px !important;
  background-color: #b2dffc !important;
  :hover {
    background-color: #0095f6 !important;
    transition: 400ms background-color;
  }
`;
const BottomPage = styled.div`
  margin-top: 15px;
  letter-spacing: 1.2px;
  font-size: 13px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid lightgray;
  width: 100%;
  padding: 20px 0px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    text-transform: capitalize;
    font-weight: 500;
  }
  span {
    text-transform: capitalize;
    font-weight: 500;
    color: #84d5ff;
    cursor: pointer;
  }
`;

const SigninButton = styled(Button)`
  color: white !important;
  letter-spacing: 1.2px !important;
  margin: 10px 0px !important;
  padding: 8px 10px !important;
  width: 270px !important;
  font-weight: 600 !important;
  text-transform: inherit !important;
  font-size: 15px !important;
  background-color: #b2dffc !important;
  :hover {
    background-color: #0095f6 !important;
    transition: 400ms background-color;
  }
`;
