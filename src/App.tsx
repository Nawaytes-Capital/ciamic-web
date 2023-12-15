import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ChatBotPage from "./pages/chatBotPage";
import ConfirmationPage from "./pages/confirmationPage";
import RouterDashboard from "./pages/dashboard/routerDashboard";
import LandingPage from "./pages/landingPage";
import RegisterPage from "./pages/registerPage";
import UseCasePage from "./pages/useCasePage";
import DetailReviewPage from "./pages/useCasePage/component/detailReviewPage";
import ListReviewPage from "./pages/useCasePage/component/listReviewPage";
import LoginPage from "./pages/useCasePage/component/loginPage";
import LoginDashboard from "./pages/dashboard/pages/loginPage";
import SuccessPage from "./pages/useCasePage/component/successPage";
import "./styles/variables.scss";
import VerificationPage from "./pages/verificationPage";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/confirmation' element={<ConfirmationPage />} />
        <Route path='/verification/:token' element={<VerificationPage />} />

        <Route path='/usecase' element={<LoginPage />} />
        <Route
          path='/usecase-form'
          element={
            <PrivateRoute
              role='user'
              unautorizedPath='/usecase'
              children={<UseCasePage />}
            />
          }
        />

        <Route
          path='/success-page'
          element={
            <PrivateRoute
              role='user'
              unautorizedPath='/usecase'
              children={<SuccessPage />}
            />
          }
        />
        <Route
          path='/list-review'
          element={
            <PrivateRoute
              role='user'
              unautorizedPath='/usecase'
              children={<ListReviewPage />}
            />
          }
        />
        <Route
          path='/detail-review/:usecaseId'
          element={
            <PrivateRoute
              role='user'
              unautorizedPath='/usecase'
              children={<DetailReviewPage />}
            />
          }
        />

        <Route
          path='/chatbot'
          element={
            <PrivateRoute
              role='user'
              unautorizedPath='/'
              children={<ChatBotPage />}
            />
          }
        />

        <Route path='/dashboard' element={<LoginDashboard />} />
        <Route
          path='/dashboard/*'
          element={
            <PrivateRoute
              role='admin_chatbot'
              unautorizedPath='/'
              children={<RouterDashboard />}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
