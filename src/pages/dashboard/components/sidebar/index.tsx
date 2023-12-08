import { AppstoreAddOutlined, DoubleLeftOutlined, LogoutOutlined, UnorderedListOutlined, UsergroupAddOutlined, WechatOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import people from "../../../../assets/images/people-img.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { logoutApp } from "../../../../redux/features/auth/authSlice";

interface ISidebar {
  isActiveMobile: boolean;
}

const SidebarDashboard: React.FC<ISidebar> = ({ isActiveMobile }) => {
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const pathName = window.location.pathname;
  const handleLogout = () => {
    dispatch(logoutApp());
    navigate("/dashboard");
  };
  const menuData = [
    {
      id: 1,
      title: "List Batch Usecase",
      link: "/dashboard/usecase",
      icon: <AppstoreAddOutlined />,
    },
    {
      id: 2,
      title: "List Respon",
      link: "/dashboard/list-response",
      icon: <UnorderedListOutlined />,
    },
    {
      id: 3,
      title: "Admin Management",
      link: "/dashboard/admin-management",
      icon: <UsergroupAddOutlined />,
    },
    {
      id: 4,
      title: "List Feedback",
      link: "/dashboard/list-feedback",
      icon: <WechatOutlined />,
    },
  ];
  return (
    <div className={`sidebar-dashboard ${isActiveMobile && "active-mobile"}`}>
      <div className='header-sidebar'>
        <h2 className='title'>Dashboard Ciamic</h2>
        <div className='icon-wrapper'>
          <DoubleLeftOutlined />
        </div>
      </div>
      <div className='menu-wrapper'>
        {menuData.map((item) => (
          <div
            className={`menu-container ${pathName === item.link && "active"}`}
            onClick={() => navigate(item.link)}
          >
            {item.icon}
            <div className='title-menu' onClick={() => navigate(item.link)}>
              {item.title}
            </div>
          </div>
        ))}
      </div>
      <div className='user-wrapper'>
        <div className='title-wp'>
          <div className='img-wp'>
            <img alt='profile' src={people} />
          </div>
          <span className='name'>{authState.user?.name}</span>
        </div>
        <LogoutOutlined
          className='btn-logout'
          style={{
            cursor: "pointer",
          }}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default SidebarDashboard;