import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);

  const fetchFlights = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/flights', {
        origin,
        destination,
        date,
      });

      setFlights(response.data.flights);
    } catch (error) {
      console.error('Error fetching flights:', error.message);
    }
  };

  return (
    <div>
      <h1>Flight Price Comparison</h1>
      <form onSubmit={fetchFlights}>
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Search Flights</button>
      </form>

      <div>
        <h2>Flight Results</h2>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Price</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={index}>
                <td>{flight.provider}</td>
                <td>${flight.price}</td>
                <td>{flight.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;