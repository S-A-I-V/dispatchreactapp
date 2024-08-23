import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RedundantTrackerDispatch.css';

const RedundantTrackerDispatch = () => {
  const [redundantEntries, setRedundantEntries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/redundant-skus-dispatch')
      .then(response => {
        console.log("Redundant SKUs fetched: ", response.data); 
        setRedundantEntries(response.data);
      })
      .catch(error => console.error('Error fetching redundant SKUs:', error));
  }, []);

  return (
    <div className="redundant-tracker">
      <h2>Dispatch Redundant SKU Tracker</h2>
      {redundantEntries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>SKU ID</th>
              <th>Station ID</th>
              <th>Scan Count</th>
              <th>Most Recent Date</th>
              <th>Most Recent Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {redundantEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.skuId}</td>
                <td>{entry.stationId}</td>
                <td>{entry.scanCount}</td>
                <td>{entry.mostRecentDate}</td>
                <td>{entry.mostRecentTimestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No redundant SKUs found.</p>
      )}
    </div>
  );
};

export default RedundantTrackerDispatch;
