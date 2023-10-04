import { MenuOutlined } from '@ant-design/icons';
import logo from '../logo.svg';

const Header = () => {
    return (
        <header className="header-wrapper">
            <img src={logo} className="logo" alt="logo" />
            <div className='menu-wrapper'>
                <div className='menu-title'>Home</div>
                <div className='menu-title'>Keuntungan</div>
                <div className='menu-title'>Cara Penggunaan</div>
                <div className='menu-title'>Feedback</div>
                <div className='menu-title btn-menu'>Form Usecase</div>
            </div>
            <div className='mobile-menu'>
                <MenuOutlined />
            </div>
        </header>
    )
}

export default Header