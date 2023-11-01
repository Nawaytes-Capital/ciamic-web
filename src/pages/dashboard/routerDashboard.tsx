import { CloseSquareOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SidebarDashboard from './components/sidebar';
import AdminManagementpage from './pages/adminManagementPage';
import ListFeedbackpage from './pages/feeadbackPage';
import ResponPage from './pages/responPage';
import UsecasePage from './pages/usecasePage';
import "./styles.scss";

function RouterDashboard() {
  const [isFullmenu, setFullmenu] = useState<boolean>(false)
  return (
    <div className='wrapper-dashboard-admin'>
      <SidebarDashboard isActiveMobile={isFullmenu} />
      <div className='content-wrapper'>
        <div className={`header-mobile ${isFullmenu && 'after-active'}`}>
          {isFullmenu ? (
              <CloseSquareOutlined onClick={() => setFullmenu(false)} style={{fontSize: "24px"}} />
          ): (
              <MenuOutlined onClick={() => setFullmenu(true)} />
          )}
        </div>
        <Routes>
          <Route path="/usecase" element={<UsecasePage />} />
          <Route path="/list-response" element={<ResponPage />} />
          <Route path="/admin-management" element={<AdminManagementpage />} />
          <Route path="/list-feedback" element={<ListFeedbackpage />} />
        </Routes>
      </div>
    </div>
    
  );
}

export default RouterDashboard;
