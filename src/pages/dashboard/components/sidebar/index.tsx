import { AppstoreAddOutlined, DoubleLeftOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./styles.scss"

const SidebarDashboard = () => {
    const navigate = useNavigate();
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
        }
    ]
    return (
        <div className="sidebar-dashboard">
            <div className="header-sidebar">
                <h2 className="title">Dashboard Ciamic</h2>
                <div className="icon-wrapper">
                    <DoubleLeftOutlined />
                </div>
            </div>
            <div className="menu-wrapper">
                {menuData.map((item) => (
                    <div className="menu-container">
                        {item.icon}
                        <div className="title-menu" onClick={() => navigate(item.link)}>{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SidebarDashboard;