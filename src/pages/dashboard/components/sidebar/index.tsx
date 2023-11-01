import { AppstoreAddOutlined, DoubleLeftOutlined, LogoutOutlined, UnorderedListOutlined, UsergroupAddOutlined, WechatOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import people from "../../../../assets/images/people-img.png";

interface ISidebar {
    isActiveMobile: boolean,
}

const SidebarDashboard:React.FC<ISidebar> = ({isActiveMobile}) => {
    const navigate = useNavigate();
    const pathName = window.location.pathname;
    const menuData = [
        {
            id: 1,
            title: "List Batch Usecase",
            link: "/dashboard/usecase",
            icon: <AppstoreAddOutlined />
        },
        {
            id: 2,
            title: "List Respon",
            link: "/dashboard/list-response",
            icon: <UnorderedListOutlined />
        },
        {
            id: 3,
            title: "Admin Management",
            link: "/dashboard/admin-management",
            icon: <UsergroupAddOutlined />
        },
        {
            id: 4,
            title: "List Feedback",
            link: "/dashboard/list-feedback",
            icon: <WechatOutlined />
        }
    ]
    return (
        <div className={`sidebar-dashboard ${isActiveMobile && 'active-mobile'}`}>
            <div className="header-sidebar">
                <h2 className="title">Dashboard Ciamic</h2>
                <div className="icon-wrapper">
                    <DoubleLeftOutlined />
                </div>
            </div>
            <div className="menu-wrapper">
                {menuData.map((item) => (
                    <div className={`menu-container ${pathName === item.link && 'active'}`}>
                        {item.icon}
                        <div className="title-menu" onClick={() => navigate(item.link)}>{item.title}</div>
                    </div>
                ))}
            </div>
            <div className="user-wrapper">
                <div className="title-wp">
                    <div className="img-wp">
                        <img alt="profile" src={people} />
                    </div>
                    <p className="name">Mubarok Al Fatih</p>
                </div>
                <LogoutOutlined className="btn-logout" />
            </div>
        </div>
    )
}

export default SidebarDashboard;