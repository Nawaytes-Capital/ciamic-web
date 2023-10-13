import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConfirmationPage from './pages/confirmationPage';
import LandingPage from './pages/landingPage';
import RegisterPage from './pages/registerPage';
import UseCasePage from './pages/useCasePage';
import LoginPage from './pages/useCasePage/component/loginPage';
import SuccessPage from './pages/useCasePage/component/successPage';
import "./styles/variables.scss";

function App() {
  return (
    <Router>
			<Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/usecase" element={<LoginPage />} />
        <Route path="/usecase-form" element={<UseCasePage />} />
        <Route path="/success-page" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
