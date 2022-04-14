import React from "react";
import "./App.css";
import { Search } from "./Components/index";
import { Booklist } from "./features/Book/pages/Booklist";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
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
      </Routes>
    </div>
  );
}

export default App;
