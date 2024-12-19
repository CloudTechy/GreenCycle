import React, { useState, useEffect } from 'react';
import { fetchFacts, fetchCenters } from './services/api';

const App = () => {
    const [facts, setFacts] = useState([]);
    const [centers, setCenters] = useState([]);

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

    return (
        <div className="container my-4">
            <h1 className="text-center text-success mb-4">Welcome to GreenCycle!</h1>
            
            <h2 className="text-primary">Recycling Facts</h2>
            <ul className="list-group mb-4">
                {facts.map((fact, index) => (
                    <li key={index} className="list-group-item">
                        {fact}
                    </li>
                ))}
            </ul>

            <h2 className="text-primary">Recycling Centers</h2>
            <ul className="list-group">
                {centers.map((center, index) => (
                    <li key={index} className="list-group-item">
                        <strong>{center.name}</strong> - {center.address}, {center.city}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
