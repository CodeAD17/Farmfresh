import React, { Component } from 'react';
import "./home.css";
import { Link, Outlet } from 'react-router-dom';

export class Home extends Component {
  componentDidMount() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (themeToggle) {
      themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
          body.classList.add('dark-theme');
          localStorage.setItem('theme', 'dark');
        } else {
          body.classList.remove('dark-theme');
          localStorage.setItem('theme', 'light');
        }
      });
    }

    // Check for saved theme preference or use default light theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      if (themeToggle) {
        themeToggle.checked = true;
      }
    }

    // Add interactivity to categories
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
      category.addEventListener('click', () => {
        categories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        // Here you would typically filter the products based on the selected category
        console.log(`Category selected: ${category.textContent}`);
      });
    });

    // Add interactivity to search
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchButton) {
      searchButton.addEventListener('click', () => {
        if (searchInput) {
          const searchTerm = searchInput.value.trim();
          if (searchTerm) {
            // Here you would typically perform a search with the entered term
            console.log(`Searching for: ${searchTerm}`);
          }
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchButton) {
          searchButton.click();
        }
      });
    }

    // Simulate loading more products when scrolling
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        // Here you would typically load more products
        console.log('Loading more products...');
      }
    });

    // Add click events to product cards (for demonstration)
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('click', () => {
        const productName = card.querySelector('h3')?.textContent;
        console.log(`Product clicked: ${productName}`);
        // Here you would typically navigate to the product detail page
      });
    });

    // Add click events to featured items (for demonstration)
    const featuredItems = document.querySelectorAll('.featured-item');
    featuredItems.forEach(item => {
      item.addEventListener('click', () => {
        const farmName = item.querySelector('h3')?.textContent;
        console.log(`Featured farm clicked: ${farmName}`);
        // Here you would typically navigate to the farm's page
      });
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1>FarmFresh</h1>
          <label className="theme-toggle">
            <input type="checkbox" id="themeToggle" />
            <span className="slider"></span>
          </label>
        </header>

        <div className="container">
          <div className="search-bar">
            <input type="text" placeholder="Search for fresh produce..." />
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          <div className="categories">
            <div className="category active">All</div>
            <div className="category">Vegetables</div>
            <div className="category">Fruits</div>
            <div className="category">Dairy</div>
            <div className="category">Eggs</div>
            <div className="category">Grains</div>
          </div>

          <section className="featured">
            <h2>Featured Farms</h2>
            <div className="featured-slider">
              <div className="featured-item">
                <img src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D" alt="Green Acres Farm" width="280" height="180" />
                <div className="featured-item-content">
                  <h3>Green Acres Farm</h3>
                  <p>Organic vegetables and free-range eggs</p>
                  <p className="price">3.2 miles away</p>
                </div>
              </div>
              <div className="featured-item">
                <img src="https://images.unsplash.com/photo-1427434846691-47fc561d1179?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhcm18ZW58MHx8MHx8fDA%3D" alt="Sunshine Orchard" width="280" height="180" />
                <div className="featured-item-content">
                  <h3>Sunshine Orchard</h3>
                  <p>Fresh fruits and homemade jams</p>
                  <p className="price">5.7 miles away</p>
                </div>
              </div>
              <div className="featured-item">
                <img src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFybXxlbnwwfHwwfHx8MA%3D%3D" alt="Happy Cow Dairy" width="280" height="180" />
                <div className="featured-item-content">
                  <h3>Happy Cow Dairy</h3>
                  <p>Organic milk, cheese, and yogurt</p>
                  <p className="price">4.5 miles away</p>
                </div>
              </div>
            </div>
          </section>

          <section className="products">
            <h2>Fresh Picks</h2>
            <div className="product-grid">
              <div className="product-card">
                <img src="https://plus.unsplash.com/premium_photo-1661827989152-6306a475e618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG9tYXRvJTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D" alt="Fresh Tomatoes" width="150" height="120" />
                <div className="product-card-content">
                  <h3>Fresh Tomatoes</h3>
                  <p>Green Acres Farm</p>
                  <p className="price">$3.99/lb</p>
                </div>
              </div>
              <div className="product-card">
                <img src="https://images.unsplash.com/photo-1716174828961-6b57b1628641?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RyYWJlcnJ5JTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D" alt="Organic Strawberries" width="150" height="120" />
                <div className="product-card-content">
                  <h3>Organic Strawberries</h3>
                  <p>Sunshine Orchard</p>
                  <p className="price">$4.50/lb</p>
                </div>
              </div>
              <div className="product-card">
                <img src="https://images.unsplash.com/photo-1477506410535-f12fe9af97cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWdnJTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D" alt="Free-range Eggs" width="150" height="120" />
                <div className="product-card-content">
                  <h3>Free-range Eggs</h3>
                  <p>Green Acres Farm</p>
                  <p className="price">$5.99/dozen</p>
                </div>
              </div>
              <div className="product-card">
                <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWlsa3xlbnwwfHwwfHx8MA%3D%3D" alt="Organic Milk" width="150" height="120" />
                <div className="product-card-content">
                  <h3>Organic Milk</h3>
                  <p>Happy Cow Dairy</p>
                  <p className="price">$4.25/gallon</p>
                </div>
              </div>
              <div className="product-card">
                <img src="https://images.unsplash.com/photo-1720456764346-1abff7d43efe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxldHR1Y2V8ZW58MHx8MHx8fDA%3D" alt="Fresh Lettuce" width="150" height="120" />
                <div className="product-card-content">
                  <h3>Fresh Lettuce</h3>
                  <p>Green Acres Farm</p>
                  <p className="price">$2.50/head</p>
                </div>
              </div>
              <div className="product-card">
                <img src="https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D" alt="Crisp Apples" width="150" height="120" />
                <div className="product-card-content">
                  <h3>Crisp Apples</h3>
                  <p>Sunshine Orchard</p>
                  <p className="price">$3.75/lb</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <nav>
          <Link to="/" className="active">
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
          <Link to="/profile" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </Link>
          <Outlet/>
        </nav>
      </div>
    );
  }
}

export default Home;
