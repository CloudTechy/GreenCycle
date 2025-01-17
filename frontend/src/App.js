import React, { useState, useEffect } from "react";
import { fetchFacts } from "./services/api";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import FactsPage from "./pages/FactsPage";
import CentersPage from "./pages/CentersPage";

const App = () => {
  const [facts, setFacts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFacts = async () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
      // setLoadingFacts(true);
      try {
        const response = await fetchFacts();
        setFacts(response.data);
      } catch (err) {
        // setError("Failed to fetch facts. Please try again later.");
      }
    };

    getFacts();
  }, []);

  const isFavorited = (center) => {
    //check that the user is logged in
    // if (!user) {
    //   return false;
    // }
    //check if the user has favorited the center
    return favorites.includes(center.id);
  };

  const toggleFavorite = (center) => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = updatedFavorites.indexOf(center.id);

    if (favoriteIndex === -1) {
      updatedFavorites.push(center.id);
    } else {
      updatedFavorites.splice(favoriteIndex, 1);
    }

    // Update the favorites in both state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar p-0 m-0 navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a
              className="navbar-brand"
              href="/"
              style={{
                color: "green",
                fontWeight: "bold",
                fontSize: "1.5rem",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              GreenCycle
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/facts">
                    Fact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/centers">
                    Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                facts={facts}
                isFavorited={isFavorited}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="/facts" element={<FactsPage />} />
          <Route path="/centers" element={<CentersPage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
