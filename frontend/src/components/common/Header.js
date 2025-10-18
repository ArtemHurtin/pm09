import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>Coffee & Books</h1>
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;