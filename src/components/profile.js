import React, { Component } from 'react';
import "./profile.css";
import { Outlet, Link } from 'react-router-dom';

export class Profile extends Component {
  componentDidMount() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (themeToggle) {
      themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-theme');
      });
    }

    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>Search</h1>
          <label className="theme-toggle">
            <input type="checkbox" id="themeToggle" />
            <span className="slider"></span>
          </label>
        </header>

        <div className="container">
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Search for vegetables..." />
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <div className="filters">
            <button className="filter-button active">All</button>
            <button className="filter-button">Organic</button>
            <button className="filter-button">Local</button>
            <button className="filter-button">Seasonal</button>
            <button className="filter-button">Sale</button>
          </div>

          <div className="search-results">
            <div className="product-card">
              <img src="https://farmfresh.app/images/tomatoes.jpg" alt="Fresh red tomatoes" className="product-image" width="150" height="150" />
              <div className="product-info">
                <div>
                  <div className="product-name">Tomatoes</div>
                  <div className="product-price">$2.99/lb</div>
                </div>
                <div className="product-farmer">Green Acres Farm</div>
              </div>
            </div>
            <div className="product-card">
              <img src="https://farmfresh.app/images/carrots.jpg" alt="Organic carrots with greens" className="product-image" width="150" height="150" />
              <div className="product-info">
                <div>
                  <div className="product-name">Organic Carrots</div>
                  <div className="product-price">$1.99/bunch</div>
                </div>
                <div className="product-farmer">Sunny Valley Organics</div>
              </div>
            </div>
            <div className="product-card">
              <img src="https://farmfresh.app/images/lettuce.jpg" alt="Fresh green lettuce" className="product-image" width="150" height="150" />
              <div className="product-info">
                <div>
                  <div className="product-name">Lettuce</div>
                  <div className="product-price">$1.50/head</div>
                </div>
                <div className="product-farmer">Fresh Fields Farm</div>
              </div>
            </div>
            <div className="product-card">
              <img src="https://farmfresh.app/images/bell-peppers.jpg" alt="Colorful bell peppers" className="product-image" width="150" height="150" />
              <div className="product-info">
                <div>
                  <div className="product-name">Bell Peppers</div>
                  <div className="product-price">$0.99/each</div>
                </div>
                <div className="product-farmer">Rainbow Gardens</div>
              </div>
            </div>
          </div>
        </div>

        <nav>
          <Link to="/" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Link>
          <Link to="/search" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search
          </Link>
          <Link to="/cart" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Cart
          </Link>
          <Link to="/profile" className="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </Link>
          <Outlet/>
        </nav>
      </div>
    )
  }
}

export default Profile
