import React from 'react';
import Homescreen from './screens/Homescreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Homescreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
