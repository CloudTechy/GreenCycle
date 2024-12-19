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
        <div>
            <h1>Welcome to GreenCycle!</h1>
            <h2>Recycling Facts</h2>
            <ul>
                {facts.map((fact, index) => (
                    <li key={index}>{fact.fact}</li>
                ))}
            </ul>

            <h2>Recycling Centers</h2>
            <ul>
                {centers.map((center, index) => (
                    <li key={index}>
                        {center.name} - {center.address}, {center.city}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
