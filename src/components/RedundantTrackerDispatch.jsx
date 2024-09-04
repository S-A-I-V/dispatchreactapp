import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import './RedundantTrackerDispatch.css';

const RedundantTracker = () => {
  const [redundantEntries, setRedundantEntries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/api/redundant-skus')
      .then(response => {
        console.log("Redundant SKUs fetched: ", response.data); 
        setRedundantEntries(response.data);
      })
      .catch(error => console.error('Error fetching redundant SKUs:', error));
  }, []);

  const columns = [
    { field: "skuId", headerName: "SKU ID", flex: 1 },
    { field: "stationId", headerName: "Station ID", flex: 1 },
    { field: "scanCount", headerName: "Scan Count", flex: 1 },
    { field: "mostRecentDate", headerName: "Most Recent Date", flex: 1 },
    { field: "mostRecentTimestamp", headerName: "Most Recent Timestamp", flex: 1 },
  ];

  const rows = redundantEntries.map((entry, index) => ({
    id: index,
    skuId: entry.skuId,
    stationId: entry.stationId,
    scanCount: entry.scanCount,
    mostRecentDate: entry.mostRecentDate,
    mostRecentTimestamp: entry.mostRecentTimestamp,
  }));

  return (
    <Box m="20px">
      <h2 style={{ color: '#FFFFFF', marginBottom: '10px', textAlign: 'center' }}>Redundant SKU Tracker</h2>
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "16px", // Makes text slightly larger to match the provided UI
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: "#E0E0E0", // Lighter text color for readability
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#2C3E50", // Darker background similar to the provided UI
            color: "#FFF",
            borderBottom: "none",
            fontSize: "18px", // Larger font size for column headers
            fontWeight: 'bold', // Bold column headers
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#34495E", // Background color for the data rows
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#2C3E50",
            color: "#FFF",
          },
          "& .MuiCheckbox-root": {
            color: "#1A237E",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#1A237E",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          disableColumnMenu={false}
          disableColumnSelector={false}
          disableSelectionOnClick={true}
          initialState={{
            filter: {
              filterModel: {
                items: [],
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default RedundantTracker;