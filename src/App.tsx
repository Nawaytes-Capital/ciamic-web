import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatBotPage from './pages/chatBotPage';
import ConfirmationPage from './pages/confirmationPage';
import LandingPage from './pages/landingPage';
import RegisterPage from './pages/registerPage';
import UseCasePage from './pages/useCasePage';
import DetailReviewPage from './pages/useCasePage/component/detailReviewPage';
import ListReviewPage from './pages/useCasePage/component/listReviewPage';
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
        <Route path="/list-review" element={<ListReviewPage />} />
        <Route path="/detail-review" element={<DetailReviewPage/>} />
        <Route path="/chatbot" element={<ChatBotPage />} />
      </Routes>
    </Router>
  );
}

export default App;
