import React, { useState, useEffect } from "react";
import MapView from "../components/MapView";
import { fetchCenters } from "../services/api";

const HomePage = (props) => {
  const facts = props.facts;
  const [newLocation, setNewLocation] = useState([0, 0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [centers, setCenters] = useState([]);
  const [filterCity] = useState("");
  const [error, setError] = useState(null);
  const [loadingCenters, setLoadingCenters] = useState(false);

  // Fetch recycling centers on component mount
  useEffect(() => {
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

    getCenters();
  }, []);

  const filteredCenters = centers.filter(
    (center) =>
      (filterCity === "" || center.city === filterCity) &&
      (center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Fetch user's geolocation on component mount
  useEffect(() => {
    fetch("http://ip-api.com/json/")
      .then((response) => response.json())
      .then((data) => {
        const { lat, lon } = data;
        setNewLocation([lat, lon]);
      })
      .catch((error) => {
        console.error("Error fetching geolocation data:", error);
      });
  }, []);

  // Auto-dismiss error message after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="container-fluid mt-0">
      {/* Header */}
      <header>
       
        {/* Hero Section */}
        <div className="hero-banner mt-0 text-center my-4">
          <div
            id="recyclingFactsCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {facts.map((fact, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <p
                    className="text-white"
                    style={{
                      fontFamily: "'Comic Sans MS', cursive, sans-serif",
                      transition: "opacity 1s ease-in-out",
                    }}
                  >
                    {fact.fact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <h1 className="display-4 text-white">
            Find Recycling Centers Near You
          </h1>
          <p className="lead text-white">Enter your city to get started</p>

          {/* Search Bar */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for Cities"
              aria-label="Search for Cities"
              aria-describedby="button-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="container-fluid main-section">
        <main className="container">
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="d-flex flex-lg-row flex-column-reverse">
            {/* Map Section */}
            <div className="col-lg-8 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-success">Map</h5>
                  {loadingCenters ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <MapView
                      centers={
                        filteredCenters.length > 0 ? filteredCenters : centers
                      }
                      mapCenter={[
                        filteredCenters.length > 0
                          ? filteredCenters[0].latitude
                          : newLocation[0],
                        filteredCenters.length > 0
                          ? filteredCenters[0].longitude
                          : newLocation[1],
                      ]}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Recycling Centers List */}
            <div className="col-lg-4 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-success">Recycling Centers</h5>
                  {filteredCenters.length > 0 ? (
                    <ul className="list-group">
                      {filteredCenters.map((center, index) => (
                        <div key={index}>
                          <li className="list-group-item text-dark">
                            <button
                              className={`btn btn-sm float-end  mt-2 ${
                                props.isFavorited(center)
                                  ? "btn-success"
                                  : "btn-outline-success"
                              }`}
                              onClick={() => props.toggleFavorite(center)}
                            >
                              {props.isFavorited(center)
                                ? "❤️ Unfavorite"
                                : "🤍 Favorite"}
                            </button>
                            <p>
                              {" "}
                              <strong className="text-warning">
                                {center.name}
                              </strong>
                              <br />
                              {center.address}, {center.city}
                            </p>
                          </li>
                        </div>
                      ))}
                    </ul>
                  ) : (
                    <p>No centers found. Try a different search.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
      <footer className="text-center p-3">
        &copy; 2024 GreenCycle. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
