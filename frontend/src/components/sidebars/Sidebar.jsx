import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/images/logo.png';
import './sidebar.css'; // Ensure to include your CSS styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faAnchor, faChartLine, faChevronRight, faChevronLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h3 className="brand">
          <img src={logo} alt="Logo" style={{ height: '35px', width: '35px' }} />
          <span>KudratWala</span>
        </h3>
        <div className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} className="toggle-icon" />
        </div>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-item">
            <span className="nav-icon"><FontAwesomeIcon icon={faHome} /></span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-item">
            <span className="nav-icon"><FontAwesomeIcon icon={faUser} /></span>
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/seller" className="nav-item">
            <span className="nav-icon"><FontAwesomeIcon icon={faChartLine} /></span>
            <span>Sell</span>
          </Link>
        </li>
        <li className={`dropdown ${activeDropdown === 0 ? 'active' : ''}`}>
          <Link to="#" className="nav-item dropdown-toggle" onClick={() => toggleDropdown(0)}>
            <div>
              <span className="nav-icon"><FontAwesomeIcon icon={faCog} /></span>
              <span>Settings</span>
            </div>
            <FontAwesomeIcon icon={activeDropdown === 0 ? 'fa-chevron-down' : 'fa-chevron-right'} className="dropdown-icon" />
          </Link>
          <ul className="dropdown-menu">
            <li><Link to="/settings/general" className="dropdown-item">General</Link></li>
            <li><Link to="/settings/privacy" className="dropdown-item">Privacy</Link></li>
            <li><Link to="/settings/notifications" className="dropdown-item">Notifications</Link></li>
          </ul>
        </li>
      </ul>

      <div className="logout">
        <Link to="/logout" className="nav-item">
          <span className="nav-icon"><FontAwesomeIcon icon={faSignOutAlt} /></span>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
