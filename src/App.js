import React, { useEffect } from 'react';
import Homescreen from './screens/Homescreen';
import Loginscreen from './screens/Loginscreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import './App.css';

function App() {
  const user = null;

  useEffect(() => {
    const subscirption = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {

      } else {

      }
    });

    return subscirption;
  }, [])

  return (
    <div className="app">
      <Router>
        {
          !user ? (
            <Loginscreen />
          ) : (
            <Routes>
              <Route
                path="/"
                element={<Homescreen />} />
            </Routes>)
        }
      </Router>
    </div>
  );
}

export default App;
