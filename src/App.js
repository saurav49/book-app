import React from "react";
import "./App.css";
import { Search, Navbar, LoginButton, LogoutButton } from "./Components/index";
import { Booklist } from "./features/Book/pages/Booklist";
import { BookDetailPage } from "./features/Book/pages/BookDetailPage";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  console.log(JSON.stringify(user, null, 2));

  const handleGetProtectedRoute = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        "https://bookBackend.saurav49.repl.co/protected",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <button onClick={handleGetProtectedRoute}>get protected route</button>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LoginButton />
              <LogoutButton />
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <Search />
              <Booklist />
            </>
          }
        />
        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
