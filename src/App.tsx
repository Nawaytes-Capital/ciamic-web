import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConfirmationPage from './pages/confirmationPage';
import LandingPage from './pages/landingPage';
import RegisterPage from './pages/registerPage';

function App() {
  return (
    <Router>
			<Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
