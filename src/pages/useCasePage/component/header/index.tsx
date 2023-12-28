import { useDispatch, useSelector } from "react-redux";
import logo from "../../../../assets/images/logo-ciamic.png";
import mockup from "../../../../assets/images/people-img.png";
import { AppDispatch, RootState } from "../../../../redux/store";
import "./styles.scss";
import { Divider, Popover } from "antd";
import { FileTextOutlined, LogoutOutlined } from "@ant-design/icons";
import { logoutApp } from "../../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userProfile from "../../../../assets/images/user-profile.png";
const HeaderUsecase = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutApp());
  };

  const handleListReview = () => {
    navigate("/list-review");
  };

  const handleUsecaseForm = () => {
    navigate("/usecase-form");
  };
  const pathname = window.location.pathname;
  return (
    <div className='header-wp-usecase'>
      <div className='logo-wp' onClick={handleUsecaseForm}>
        <img src={logo} height='50' />

        <p className='title'>Form Pengambilan Usecase</p>
      </div>
      {pathname !== "/usecase" && email && (
        <Popover
          content={
            <div
              style={{
                width: "200px",
              }}
            >
              <FileTextOutlined />
              <p
                style={{
                  display: "inline-block",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={handleListReview}
              >
                Riwayat Respons
              </p>
              <Divider
                style={{
                  margin: "10px",
                }}
              />
              <LogoutOutlined />
              <p
                style={{
                  display: "inline-block",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          }
        >
          <div className='account-wp'>
            <div className='img-wp'>
              <img src={userProfile} alt='' className='img-account' />
            </div>
            <p className='title-account'>{authState.user?.name}</p>
          </div>
        </Popover>
      )}
    </div>
  );
};

export default HeaderUsecase;
