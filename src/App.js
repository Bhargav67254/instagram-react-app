import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateValue } from "./components/Stateprovider";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { auth } from "./firebase";
import Header from "./components/home/Header";
import ProfilePage from "./pages/ProfilePage";
import VisitPage from "./pages/VisitPage";

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(async (loginUser) => {
      if (loginUser) {
        dispatch({
          type: "SET_NEW_USER",
          user: loginUser,
        });
      } else {
        dispatch({
          type: "SET_NEW_USER",
          user: null,
        });
      }
    });
  }, [dispatch, user]);

  return (
    <Router>
      {!user ? (
        <LoginPage />
      ) : (
        <Container>
          <Header />
          <Switch>
            <Route path={"/profile/:email"}>
              <Wrapper>
                <VisitPage />
              </Wrapper>
            </Route>
            <Route exact path={"/:username"}>
              <Wrapper>
                <ProfilePage />
              </Wrapper>
            </Route>
            <Route exact path={"/"}>
              <Wrapper>
                <HomePage />
              </Wrapper>
            </Route>
          </Switch>
        </Container>
      )}
    </Router>
  );
}

export default App;

const Container = styled.div``;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
