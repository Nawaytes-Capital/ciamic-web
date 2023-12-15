import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../../../assets/images/logo-ciamic.png";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const isAuthenticated = (): boolean => {
    const accessToken = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    return !!accessToken && !!user;
  };
  return (
    <header className='header-wrapper'>
      <img src={logo} className='logo' alt='logo' />
      <div className='menu-wrapper'>
        <HashLink
          smooth
          to='/#home'
          style={{
            textDecoration: "none",
          }}
        >
          <div className='menu-title '>Home</div>
        </HashLink>
        <HashLink
          smooth
          to='/#keuntungan'
          style={{
            textDecoration: "none",
          }}
        >
          <div className='menu-title'>Keuntungan</div>
        </HashLink>
        <HashLink
          smooth
          to='/#cara-penggunaan'
          style={{
            textDecoration: "none",
          }}
        >
          {" "}
          <div className='menu-title'>Cara Penggunaan</div>
        </HashLink>
        <HashLink
          smooth
          to='/#feedback'
          style={{
            textDecoration: "none",
          }}
        >
          {" "}
          <div className='menu-title'>Feedback</div>
        </HashLink>
        <Link
          to={"/usecase"}
          style={{
            textDecoration: "none",
          }}
        >
          <div className='menu-title btn-menu'>Form Usecase</div>
        </Link>
      </div>
      <div className='mobile-menu'>
        <MenuOutlined onClick={() => setIsActive(true)} />
      </div>
      <div className={`fullmenu ${isActive && "active"}`}>
        <div className='fullmenu-wp'>
          <CloseOutlined
            onClick={() => setIsActive(false)}
            style={{
              textAlign: "right",
              display: "block",
              marginBottom: "24px",
            }}
          />
          <HashLink
            smooth
            to='/#home'
            style={{
              textDecoration: "none",
            }}
            onClick={() => setIsActive(false)}
          >
            <div className='menu-title '>Home</div>
          </HashLink>
          <HashLink
            smooth
            to='/#keuntungan'
            style={{
              textDecoration: "none",
            }}
            onClick={() => setIsActive(false)}
          >
            <div className='menu-title'>Keuntungan</div>
          </HashLink>
          <HashLink
            smooth
            to='/#cara-penggunaan'
            style={{
              textDecoration: "none",
            }}
            onClick={() => setIsActive(false)}
          >
            {" "}
            <div className='menu-title'>Cara Penggunaan</div>
          </HashLink>
          <HashLink
            smooth
            to='/#feedback'
            style={{
              textDecoration: "none",
            }}
            onClick={() => setIsActive(false)}
          >
            {" "}
            <div className='menu-title'>Feedback</div>
          </HashLink>
          <Link
            to={"/usecase"}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              className='menu-title btn-menu'
              style={{ textAlign: "center", marginTop: "14px" }}
            >
              Form Usecase
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header