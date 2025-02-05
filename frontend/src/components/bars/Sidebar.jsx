import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FaUserCircle } from 'react-icons/fa'; // Import cart and profile icons
import './Sidebar.css';
import logo from '/images/logo.png';
import SearchBar from '../searchs/searchbar';
import { userContext } from '../../Context/UserContext.jsx';

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const {login,setLogin} = useContext(userContext);
  //const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock authentication state

  const showSidebar = () => setSidebar(!sidebar);

  return (
    // <nav className="nav">
    //   <IconContext.Provider value={{ color: 'black' }}>
    //     <NavIcon to="/" onClick={showSidebar} className = "logo-text">
    //       <h2>KudratWala</h2>
    //     </NavIcon>
    //     <NavContent>
    //       <SearchBar />
    //     </NavContent>
    //     <AuthSection>
    //       {login ? (
    //         <Link to="/profile">
    //           <FaUserCircle style={{ fontSize: '24px', color: 'black' }} />
    //         </Link>
    //       ) : (
    //         <Link to="/auth" style={{ marginRight: '20px', color: 'black' }}>
    //           Login
    //         </Link>
    //       )}
    //     </AuthSection>
    //   </IconContext.Provider>
    // </nav>
    <nav className="nav">
      {/* <IconContext.Provider value={{ color: "black" }}> */}
        <Link to="/" onClick={showSidebar} className="logo-text">
          <h2>KudratWala</h2>
        </Link>
        <div className = "nav-right">
          <div className="nav-content">
            <SearchBar />
          </div>
          <div className="auth-section">
            {login ? (
              <Link to="/profile">
                <FaUserCircle style={{ fontSize: "24px", color: "black" }} />
              </Link>
            ) : (
              <Link to="/auth" style={{ marginRight: "20px", color: "black" }}>
                Login
              </Link>
            )}
          </div>
        </div>
      {/* </IconContext.Provider> */}
    </nav>
  );
};

export default NavBar;
