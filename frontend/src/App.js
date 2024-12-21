import React, { useState, useEffect } from "react";
import { fetchFacts, fetchCenters } from "./services/api";

const App = () => {
  const [facts, setFacts] = useState([]);
  const [centers, setCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    const getFacts = async () => {
      try {
        const response = await fetchFacts();
        setFacts(response.data);
      } catch (error) {
        console.error("Error fetching facts:", error);
      }
    };

    const getCenters = async () => {
      try {
        const response = await fetchCenters();
        setCenters(response.data);
      } catch (error) {
        console.error("Error fetching centers:", error);
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
  return (
    <div className="container my-4">
      <h1 className="text-center text-success mb-4">Welcome to GreenCycle!</h1>
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
        {filteredFacts.map((fact, index) => (
          <li key={index} className="list-group-item">
            {fact.fact}
          </li>
        ))}
      </ul>
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
        {filteredCenters.map((center, index) => (
          <li key={index} className="list-group-item">
            <strong>{center.name}</strong> - {center.address}, {center.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
