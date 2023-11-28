import React from 'react';
import Homescreen from './Homescreen';
import Nav from './Nav';
import Banner from './Banner';
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Homescreen />
    </div>
  );
}

export default App;
