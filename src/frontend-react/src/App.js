import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './includes/Header';
import Footer from './includes/Footer';
import Modal from './includes/Modal';

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div>
          <Header />
          { this.props.children }
          <Footer />
          <Modal />
        </div>
    );
  }
}

export default App;
