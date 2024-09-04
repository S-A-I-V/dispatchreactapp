import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';  // Reuse the same CSS file
import { useRef } from 'react';

const SidebarDispatch = () => (
  <div className="sidebar">
    <h2>Dispatch Options</h2>
    <ul>
      <li><Link to="/data-entry-dispatch">Data Entry</Link></li>
      <li><Link to="/data-table-dispatch">Data Table View</Link></li>
      <li><Link to="/redundant-tracker-dispatch">Redundant Tracker</Link></li>
    </ul>
  </div>
);

export default SidebarDispatch;
