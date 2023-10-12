import logo from "../../../../assets/images/logo-ciamic.png";
import mockup from "../../../../assets/images/people-img.png";
import "./styles.scss";

const HeaderUsecase = () => {
    return (
        <div className="header-wp">
            <div className="logo-wp">
                <img src={logo} height="50" />
                <p className="title">Form Pengambilan Usecase</p>
            </div>
            <div className="account-wp">
                <div className="img-wp">
                    <img src={mockup} className="img-account" />
                </div>
                <p className="title-account">Mubarak Al-Fatih</p>
            </div>
        </div>
    )
}

export default HeaderUsecase