import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/images/logo.png';
import './sidebar.css'; // Ensure to include your CSS styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faAnchor, faChartLine, faChevronRight, faChevronLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { userContext } from '../../Context/UserContext';
import { FaShoppingCart } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const {login,setLogin} = useContext(userContext);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logOut = async ()=>{
    try{
      const url = `${backendUrl}/users/logout`;
      const res = await axios.get(url,{withCredentials:true});
      if(res){
        setLogin(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          <Link to="/sell" className="nav-item">
            <span className="nav-icon"><FontAwesomeIcon icon={faChartLine} /></span>
            <span>Sell</span>
          </Link>
        </li>
        <li>
          {login && <button className="nav-item" onClick = {logOut}>
            <span className="nav-icon"><FontAwesomeIcon icon={faSignOutAlt} /></span>
            <span>Logout</span>
          </button>}
        </li>
        <li>
          <Link to="/cart" className="nav-item">
            <span className="nav-icon"><FaShoppingCart /></span>
            <span>Cart</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
