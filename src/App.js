import React, { useEffect } from 'react';
import Homescreen from './screens/Homescreen';
import Loginscreen from './screens/Loginscreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscirption = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      } else {
        dispatch(logout);
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
