import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Auth from '../containers/Auth';
import '../styles/app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Auth />
        <Navigation />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
