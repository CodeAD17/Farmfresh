import React, { Component } from 'react';
import "./search.css";
import { Outlet, Link } from 'react-router-dom';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, name: "Organic Apples", price: 3.99, category: "fruits", image: "https://farmfresh.app/images/organic-apples.jpg" },
        { id: 2, name: "Farm Fresh Eggs", price: 5.99, category: "dairy", image: "https://farmfresh.app/images/farm-fresh-eggs.jpg" },
        { id: 3, name: "Artisan Bread", price: 6.99, category: "bakery", image: "https://farmfresh.app/images/artisan-bread.jpg" },
        { id: 4, name: "Organic Carrots", price: 2.49, category: "vegetables", image: "https://farmfresh.app/images/organic-carrots.jpg" },
        { id: 5, name: "Fresh Milk", price: 4.49, category: "dairy", image: "https://farmfresh.app/images/fresh-milk.jpg" },
        { id: 6, name: "Organic Strawberries", price: 4.99, category: "fruits", image: "https://farmfresh.app/images/organic-strawberries.jpg" },
        { id: 7, name: "Whole Grain Muffins", price: 7.99, category: "bakery", image: "https://farmfresh.app/images/whole-grain-muffins.jpg" },
        { id: 8, name: "Organic Spinach", price: 3.49, category: "vegetables", image: "https://farmfresh.app/images/organic-spinach.jpg" }
      ],
      filteredProducts: [],
      searchTerm: '',
      activeCategory: 'all'
    };
  }

  componentDidMount() {
    this.renderProducts(this.state.products);
    this.setupEventListeners();
    this.checkTheme();
  }

  checkTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      document.getElementById('themeToggle').checked = true;
    }
  }

  setupEventListeners = () => {
    document.getElementById('themeToggle').addEventListener('change', this.handleThemeToggle);
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', this.handleFilterClick);
    });
    document.getElementById('searchBtn').addEventListener('click', this.handleSearch);
    document.getElementById('searchInput').addEventListener('keyup', this.handleSearchKeyUp);
    document.getElementById('productGrid').addEventListener('click', this.handleAddToCart);
  }

  handleThemeToggle = (e) => {
    if (e.target.checked) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  handleFilterClick = (e) => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    e.target.classList.add('active');
    const category = e.target.dataset.category;
    this.setState({ activeCategory: category }, this.filterProducts);
  }

  handleSearch = () => {
    this.filterProducts();
  }

  handleSearchKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.filterProducts();
    }
  }

  handleAddToCart = (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = parseInt(e.target.dataset.id);
      this.addToCart(productId);
    }
  }

  filterProducts = () => {
    const searchTerm = document.getElementById('searchInput').value;
    const filteredProducts = this.state.products.filter(product => {
      const categoryMatch = this.state.activeCategory === 'all' || product.category === this.state.activeCategory;
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
    this.setState({ filteredProducts, searchTerm }, () => this.renderProducts(filteredProducts));
  }

  renderProducts = (products) => {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    if (products.length === 0) {
      productGrid.innerHTML = '<div class="no-results">No products found. Try a different search or filter.</div>';
      return;
    }

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" width="200" height="200" />
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      `;
      productGrid.appendChild(productCard);
    });
  }

  addToCart = (productId) => {
    console.log(`Product ${productId} added to cart`);
    alert(`Product added to cart!`);
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
          <div className="search-container">
            <input type="text" id="searchInput" className="search-input" placeholder="Search for products..." />
            <button id="searchBtn" className="search-btn">Search</button>
          </div>

          <div className="filters">
            <button className="filter-btn active" data-category="all">All</button>
            <button className="filter-btn" data-category="fruits">Fruits</button>
            <button className="filter-btn" data-category="vegetables">Vegetables</button>
            <button className="filter-btn" data-category="dairy">Dairy</button>
            <button className="filter-btn" data-category="bakery">Bakery</button>
          </div>

          <div id="productGrid" className="product-grid">
            {/* Products will be dynamically inserted here */}
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
          <Link to="/search" className="active" >
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
          <Link to="/profile">
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

export default Search;
