import React, { useState, useEffect } from "react";
import { fetchFacts, fetchCenters } from "./services/api";

const App = () => {
  const [facts, setFacts] = useState([]);
  const [centers, setCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loadingFacts, setLoadingFacts] = useState(false);
  const [loadingCenters, setLoadingCenters] = useState(false);

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
    fact.fact.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCenters = centers.filter(
    (center) => filterCity === "" || center.city === filterCity
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedFacts = filteredFacts.slice(startIndex, endIndex);
  const paginatedCenters = filteredCenters.slice(startIndex, endIndex);
  return (
    <div className="container my-5">
      <h1 className="text-center text-success mb-4">Welcome to GreenCycle!</h1>
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
        </div>
      )}

      <h2 className="text-center text-primary">Recycling Facts</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search facts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row">
        {paginatedFacts.map((fact, index) => (
          <div key={index} className="col-md-4">
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
      {!loadingFacts && filteredFacts.length === 0 && <p>No facts found.</p>}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className="btn btn-secondary"
          disabled={endIndex >= filteredFacts.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <h2 className="text-center text-primary">Recycling Centers</h2>
      <div className="mb-3">
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
          <div key={index} className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{center.name}</h5>
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
        <p>No recycling centers found.</p>
      )}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className="btn btn-secondary"
          disabled={endIndex >= filteredCenters.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
