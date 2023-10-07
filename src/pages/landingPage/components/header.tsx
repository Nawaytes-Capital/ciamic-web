import { MenuOutlined } from '@ant-design/icons';
import logo from "../../../assets/images/logo-ciamic.png";
import { HashLink } from "react-router-hash-link";

const Header = () => {
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
        <div className='menu-title btn-menu'>Form Usecase</div>
      </div>
      <div className='mobile-menu'>
        <MenuOutlined />
      </div>
    </header>
  );
};

export default Header