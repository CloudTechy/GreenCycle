import React, { useState, useEffect } from "react";
import { fetchFacts, fetchCenters } from "./services/api";

const App = () => {
  const [facts, setFacts] = useState([]);
  const [centers, setCenters] = useState([]);
  const [filterCity, setFilterCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loadingFacts, setLoadingFacts] = useState(false);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [searchFacts, setSearchFacts] = useState("");
  const [searchCenters, setSearchCenters] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    const getFacts = async () => {
      setLoadingFacts(true);
      try {
        const response = await fetchFacts();
        setFacts(response.data);
      } catch (err) {
        setError("Failed to fetch facts. Please try again later.");
      } finally {
        setLoadingFacts(false);
      }
    };

    const getCenters = async () => {
      setLoadingCenters(true);
      try {
        const response = await fetchCenters();
        setCenters(response.data);
      } catch (err) {
        setError("Failed to fetch recycling centers. Please try again later.");
      } finally {
        setLoadingCenters(false);
      }
    };

    getFacts();
    getCenters();
  }, []);

  const filteredFacts = facts.filter((fact) =>
    fact.fact.toLowerCase().includes(searchFacts.toLowerCase())
  );
  const filteredCenters = centers.filter(
    (center) =>
    (filterCity === "" || center.city === filterCity) && (
    center.name.toLowerCase().includes(searchCenters.toLowerCase()) ||
    center.city.toLowerCase().includes(searchCenters.toLowerCase()) ||
    center.address.toLowerCase().includes(searchCenters.toLowerCase())) 
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedFacts = filteredFacts.slice(startIndex, endIndex);
  const paginatedCenters = filteredCenters.slice(startIndex, endIndex);
  return (
    <div className="container my-5">
      <h1 className="text-center text-success mb-4">Welcome to GreenCycle!</h1>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            GreenCycle
          </a>
        </div>
      </nav>
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
        </div>
      )}

      <h2 className="text-center text-success">Recycling Facts</h2>
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search facts..."
          value={searchFacts}
          onChange={(e) => setSearchFacts(e.target.value)}
        />
      </div>
      <div className="row">
        {paginatedFacts.map((fact, index) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-4">
            <div className="card mb-3">
              <div className="card-body">
                <p className="card-text">{fact.fact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loadingFacts && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!loadingFacts && filteredFacts.length === 0 &&  <p className="text-muted">No facts found matching your search.</p>}
      {filteredFacts.length > 5 && (
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            className="btn btn-primary"
            disabled={endIndex >= filteredFacts.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      <h2 className="text-center text-success">Recycling Centers</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search centers..."
          value={searchCenters}
          onChange={(e) => setSearchCenters(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <select
          className="form-select"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {Array.from(new Set(centers.map((center) => center.city))).map(
            (city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            )
          )}
        </select>
      </div>
      <div className="row">
        {paginatedCenters.map((center, index) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title text-primary">{center.name}</h5>
                <p className="card-text">
                  {center.address}, {center.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loadingCenters && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!loadingCenters && filteredCenters.length === 0 && (
        <p className="text-muted">No recycling centers found matching your search.</p>
      )}
      {loadingCenters.length > 5 && (
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            className="btn btn-primary"
            disabled={endIndex >= filteredCenters.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
      <footer className="text-center mt-5 p-3">
        &copy; 2024 GreenCycle. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
