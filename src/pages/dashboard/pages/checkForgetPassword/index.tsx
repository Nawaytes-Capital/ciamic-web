import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import logo from "../../../../assets/images/logo512.png";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function CheckForgotPasswordPage() {
  const params = useParams<{ email: string }>();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState<boolean>(false);
  const handleOpenEmail = () => {
    window.open("https://gmail.com", "_blank");
  };

  useEffect(() => {
    if (!params.email) {
      navigate("/");
    }
    try {
      atob(params.email!);
      setIsValid(true);
    } catch (error) {
      navigate("/");
    }
  }, []);

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div className='check-forgot-password-page-wp'>
      <div className='container'>
        <img src={logo} className='logo' alt='logo' />
        <span className='title'>Check Email Anda</span>
        <div className='content'>
          <span>Kami sudah mengirimkan link untuk reset</span>
          <span>password Anda ke email :</span>
          <span>
            <strong>{isValid ? atob(params.email!) : ""}</strong>
          </span>
        </div>
        <Button className='btn' type='primary' onClick={handleOpenEmail}>
          Buka Aplikasi Email
        </Button>
        <div className='resend-email-wp'>
          <span>Tidak Dapat Mengirim Email?</span>{" "}
          <span className='resend-email'>Kirim Ulang</span>
        </div>
        <div className='back-to-login-wp' onClick={handleBackToLogin}>
          <ArrowLeftOutlined />
          <span className='back-to-login' onClick={() => {}}>
            Kembali ke Halaman Login
          </span>
        </div>
      </div>
    </div>
  );
}
