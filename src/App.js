import React, { useEffect } from "react";
import "./App.css";
import {
  Search,
  Navbar,
  LoginButton,
  LogoutButton,
  PrivateRoute,
} from "./Components/index";
import { Booklist } from "./features/Book/pages/Booklist";
import { BookDetailPage } from "./features/Book/pages/BookDetailPage";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ADD_USER } from "./urls";

function App() {
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    user &&
      user?.email &&
      (async function () {
        try {
          const token = await getAccessTokenSilently();
          localStorage.setItem("book__token", JSON.stringify(token));
          const response = await axios.post(
            ADD_USER,
            { email: user?.email },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      })();
    // eslint-disable-next-line
  }, [user?.email]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="login__wrapper">
              <LoginButton />
              <LogoutButton />
            </div>
          }
        />
        <Route path="/search" element={<PrivateRoute />}>
          <Route
            path="/search"
            element={
              <>
                <Search />
                <Booklist />
              </>
            }
          />
        </Route>
        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
