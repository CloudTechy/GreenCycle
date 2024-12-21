import React, { useState, useEffect } from "react";
import { fetchFacts, fetchCenters } from "./services/api";

const App = () => {
  const [facts, setFacts] = useState([]);
  const [centers, setCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    const getFacts = async () => {
      try {
        const response = await fetchFacts();
        setFacts(response.data);
      } catch (err) {
        setError("Failed to fetch facts. Please try again later.");
      }
    };

    const getCenters = async () => {
      try {
        const response = await fetchCenters();
        setCenters(response.data);
      } catch (err) {
        setError("Failed to fetch recycling centers. Please try again later.");
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
    <div className="container my-4">
      <h1 className="text-center text-success mb-4">Welcome to GreenCycle!</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search facts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2 className="text-primary">Recycling Facts</h2>
      <ul className="list-group mb-4">
        {paginatedFacts.map((fact, index) => (
          <li key={index} className="list-group-item">
            {fact.fact}
          </li>
        ))}
      </ul>
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
            disabled={
              endIndex >= filteredFacts.length 
            }
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

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

      <h2 className="text-primary">Recycling Centers</h2>
      

      <ul className="list-group">
        {paginatedCenters.map((center, index) => (
          <li key={index} className="list-group-item">
            <strong>{center.name}</strong> - {center.address}, {center.city}
          </li>
        ))}
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
            disabled={
              endIndex >= filteredCenters.length
            }
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </ul>
    </div>
  );
};

export default App;
