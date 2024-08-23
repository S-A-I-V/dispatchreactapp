import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataEntry from './components/DataEntryDispatch';
import DataTable from './components/DataTableDispatch';
import RedundantTracker from './components/RedundantTrackerDispatch';
import Sidebar from './components/Sidebar';

// Dispatch components
import DataEntryDispatch from './components/DataEntryDispatch';
import DataTableDispatch from './components/DataTableDispatch';
import RedundantTrackerDispatch from './components/RedundantTrackerDispatch';
import SidebarDispatch from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Packing Section Routes */}
          <Route path="/data-entry" element={<DataEntry />} />
          <Route path="/data-table" element={<DataTable />} />
          <Route path="/redundant-tracker" element={<RedundantTracker />} />
          <Route path="/" element={<Sidebar />} />

          {/* Dispatch Section Routes */}
          <Route path="/data-entry-dispatch" element={<DataEntryDispatch />} />
          <Route path="/data-table-dispatch" element={<DataTableDispatch />} />
          <Route path="/redundant-tracker-dispatch" element={<RedundantTrackerDispatch />} />
          <Route path="/dispatch" element={<SidebarDispatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
