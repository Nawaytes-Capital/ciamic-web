import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidebarDashboard from './components/sidebar';
import ResponPage from './pages/responPage';
import UsecasePage from './pages/usecasePage';
import "./styles.scss";

function RouterDashboard() {
  return (
    <div className='wrapper-dashboard-admin'>
      <SidebarDashboard />
      <div className='content-wrapper'>
        <Routes>
          <Route path="/usecase" element={<UsecasePage />} />
          <Route path="/list-response" element={<ResponPage />} />
        </Routes>
      </div>
    </div>
    
  );
}

export default RouterDashboard;
