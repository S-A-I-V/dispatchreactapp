import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import './DataTableDispatch.css';  // Reuse the same CSS file

const DataTableDispatch = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/data-dispatch')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = [
    { field: "skuId", headerName: "SKU ID", flex: 1 },
    { field: "nexsId", headerName: "NEXS ID", flex: 1 },  // Added NEXS ID
    { field: "dateOfScan", headerName: "Date of Scan", flex: 1 },
    { field: "timestamp", headerName: "Timestamp", flex: 1 },
    { field: "stationId", headerName: "Station ID", flex: 1 },
  ];

  const rows = data.map((row, index) => ({
    id: index,
    skuId: row.skuId,
    nexsId: row.nexsId,  // Map NEXS ID
    dateOfScan: row.dateOfScan,
    timestamp: row.timestamp,
    stationId: row.stationId,
  }));

  return (
    <Box m="20px">
      <h2 style={{ color: '#FFFFFF', marginBottom: '10px', textAlign: 'center' }}>Dispatch Data Table</h2>
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
        />
      </Box>
    </Box>
  );
};

export default DataTableDispatch;