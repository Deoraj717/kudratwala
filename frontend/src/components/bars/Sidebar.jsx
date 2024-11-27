import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'; // Import cart and profile icons
import './navbar.css';
import logo from '/images/logo.png';
import SearchBar from '../searchs/searchbar';

const Nav = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavIcon = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
`;

const CartIcon = styled(Link)`
  margin-left: 20px;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: black;
`;

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock authentication state

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Nav className="nav">
      <IconContext.Provider value={{ color: 'black' }}>
        <NavIcon to="/" onClick={showSidebar}>
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        </NavIcon>
        <NavContent>
          <SearchBar />
          <p style={{ margin: '0 20px', textAlign: 'center' }}>Ask through Experts</p>
        </NavContent>
        <AuthSection>
          {isAuthenticated ? (
            <Link to="/profile">
              <FaUserCircle style={{ fontSize: '24px', color: 'black' }} />
            </Link>
          ) : (
            <Link to="/auth" style={{ marginRight: '20px', color: 'black' }}>
              Login
            </Link>
          )}
          <CartIcon to="/cart">
            <FaShoppingCart />
          </CartIcon>
        </AuthSection>
      </IconContext.Provider>
    </Nav>
  );
};

export default NavBar;
