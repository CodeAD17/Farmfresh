import React, { Component } from 'react'
import { BrowserRouter, Router, Route, Link, Routes, NavLink } from 'react-router-dom';
import Home from './components/home';
import Search from './components/search';
import Cart from './components/cart';
import Profile from './components/profile';

export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <div>
        <Routes>
            
            <Route path='/' element={<Home/>}/>
             <Route path='/search' element={<Search/>}/>
             <Route path='/cart' element={<Cart/>}/>
             <Route path='/profile' element={<Profile/>}/>
              
            </Routes>
        </div>
        </BrowserRouter>
        
      </div>
    )
  }
}

export default App