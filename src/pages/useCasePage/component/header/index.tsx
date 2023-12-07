import { useSelector } from "react-redux";
import logo from "../../../../assets/images/logo-ciamic.png";
import mockup from "../../../../assets/images/people-img.png";
import { RootState } from "../../../../redux/store";
import "./styles.scss";

const HeaderUsecase = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const email = localStorage.getItem("userEmail");
  return (
    <div className='header-wp-usecase'>
      <div className='logo-wp'>
        <img src={logo} height='50' />
        <p className='title'>Form Pengambilan Usecase</p>
      </div>
      {email && (
        <div className='account-wp'>
          <div className='img-wp'>
            <img src={mockup} className='img-account' />
          </div>
          <p className='title-account'>{authState.user?.name}</p>
        </div>
      )}
    </div>
  );
};

export default HeaderUsecase;
