import React, { useEffect } from "react";
import "./App.css";
import {
  Search,
  Navbar,
  LoginButton,
  LogoutButton,
  PrivateRoute,
  Profile,
} from "./Components/index";
import { Booklist } from "./features/Book/pages/Booklist";
import { BookDetailPage } from "./features/Book/pages/BookDetailPage";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ADD_USER } from "./urls";
import { Watch } from "react-loader-spinner";

function App() {
  const { user, getAccessTokenSilently, isLoading, error } = useAuth0();

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
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      })();
    // eslint-disable-next-line
  }, [user?.email]);

  return (
    <div className="App">
      <Navbar />
      {error && (
        <div className="loader__wrapper">
          <p>Authentication Error</p>
        </div>
      )}
      {!error && isLoading && (
        <div className="loader__wrapper">
          <Watch width={100} height={100} color="#333" />
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div className="login__wrapper">
              {!error && !isLoading && (
                <>
                  <LoginButton />
                  <LogoutButton />
                </>
              )}
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
        <Route path="/book/:id" element={<PrivateRoute />}>
          <Route path="/book/:id" element={<BookDetailPage />} />
        </Route>
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="/user" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
