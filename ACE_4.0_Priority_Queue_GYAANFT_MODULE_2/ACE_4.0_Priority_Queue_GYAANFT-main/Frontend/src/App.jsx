import Dashboard from './pages/Dashboard.jsx';
import Landing from './pages/Landing';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Whiteboard from './components/Excal/WhiteBoard.jsx';
import './index.css';

import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';


const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const firstTimeUser = localStorage.getItem(`firstTime_${user.sub}`);
      if (!firstTimeUser) {
        setIsFirstTime(true);
        localStorage.setItem(`firstTime_${user.sub}`, "false");
      }
    }
  }, [isAuthenticated, user]);

  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={isAuthenticated ?  <Navigate to="/dashboard" /> : <Landing />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
         
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;
