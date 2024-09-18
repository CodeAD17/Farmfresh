import React, { Component } from 'react';
import "./cart.css";
import { Outlet, Link } from 'react-router-dom';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [
        { id: 1, name: "Organic Apples", price: 3.99, quantity: 2, image: "https://farmfresh.app/images/organic-apples.jpg" },
        { id: 2, name: "Farm Fresh Eggs", price: 5.99, quantity: 1, image: "https://farmfresh.app/images/farm-fresh-eggs.jpg" },
        { id: 3, name: "Artisan Bread", price: 6.99, quantity: 1, image: "https://farmfresh.app/images/artisan-bread.jpg" }
      ]
    };
  }

  componentDidMount() {
    this.setupThemeToggle();
    this.renderCart();
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      themeToggle.checked = true;
    }
  }

  renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    const cartSummary = document.getElementById('cartSummary');
    
    if (this.state.cartItems.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Your cart is empty</p>
          <a href="https://farmfresh.app/search" class="continue-shopping">Continue Shopping</a>
        </div>
      `;
      cartSummary.style.display = 'none';
      return;
    }

    cartSummary.style.display = 'block';
    let cartHTML = '<div class="cart-container">';
    
    this.state.cartItems.forEach(item => {
      cartHTML += `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" width="80" height="80" />
          <div class="cart-item-details">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-price">${item.price.toFixed(2)}</p>
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease">-</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" />
              <button class="quantity-btn increase">+</button>
            </div>
          </div>
          <button class="remove-item">Remove</button>
        </div>
      `;
    });
    
    cartHTML += '</div>';
    cartContainer.innerHTML = cartHTML;

    this.updateSummary();
  }

  updateSummary() {
    const subtotal = this.state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.07;
    const shipping = 5.99;
    const total = subtotal + tax + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
  }

  updateQuantity(cartItem, change) {
    const id = parseInt(cartItem.dataset.id);
    const updatedCartItems = this.state.cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + change) };
      }
      return item;
    });
    this.setState({ cartItems: updatedCartItems }, () => this.renderCart());
  }

  updateQuantityFromInput(cartItem, newQuantity) {
    const id = parseInt(cartItem.dataset.id);
    const updatedCartItems = this.state.cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, parseInt(newQuantity) || 1) };
      }
      return item;
    });
    this.setState({ cartItems: updatedCartItems }, () => this.renderCart());
  }

  removeItem(cartItem) {
    const id = parseInt(cartItem.dataset.id);
    const updatedCartItems = this.state.cartItems.filter(item => item.id !== id);
    this.setState({ cartItems: updatedCartItems }, () => this.renderCart());
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
          <h2>Shopping Cart</h2>
          <div id="cartContainer">
            {/* Cart items will be dynamically inserted here */}
          </div>
          <div id="cartSummary" className="cart-summary" style={{ display: 'none' }}>
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span id="subtotal">$0.00</span>
            </div>
            <div className="summary-row">
              <span>Tax (7%):</span>
              <span id="tax">$0.00</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span id="shipping">$5.99</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span id="total">$0.00</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
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
          <Link to="/cart" className="active">
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

export default Cart;
