import React from "react";
import "./App.css";
import { Search, Navbar } from "./Components/index";
import { Booklist } from "./features/Book/pages/Booklist";
import { BookDetailPage } from "./features/Book/pages/BookDetailPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
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
