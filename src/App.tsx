import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatBotPage from './pages/chatBotPage';
import ConfirmationPage from './pages/confirmationPage';
import LandingPage from './pages/landingPage';
import RegisterPage from './pages/registerPage';
import UseCasePage from './pages/useCasePage';
import "./styles/variables.scss";

function App() {
  return (
    <Router>
			<Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/usecase" element={<UseCasePage />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
      </Routes>
    </Router>
  );
}

export default App;
