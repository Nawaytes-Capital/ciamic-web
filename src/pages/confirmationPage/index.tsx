import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import icon from "../../assets/images/icon-confirmation1.png";
import icon2 from "../../assets/images/icon-confirmation2.png";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { resendVerification } from "../../api/auth";

const ConfirmationPage = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const email = useParams<{ email: string }>();
  const openEmail = () => {
    window.open("https://gmail.com", "_blank");
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const resendEmail = async () => {
    try {
      setIsLoading(true);
      await resendVerification(atob(email.email!));
      setIsLoading(false);
      message.success("Email berhasil dikirim");
    } catch (error) {
      setIsLoading(false);
      message.error("Email gagal dikirim");
    }
  };
  return (
    <div className='confirmation-container'>
      <div className='confirmation-wp'>
        {confirm ? (
          <>
            <img src={icon2} className='icon' />
            <p className='title'>Email Berhasil Terdaftar</p>
            <p className='subtitle'>
              Selamat Email kamu berhasil terdaftar di Ciamic.
            </p>
            <Button type='primary' htmlType='submit' className='btn-email'>
              Login Untuk Melanjutkan
            </Button>
          </>
        ) : (
          <>
            <img src={icon} className='icon' />
            <p className='title'>Konfirmasi Email</p>
            <p className='subtitle'>
              {`Kami telah mengirimkan Email Konfirmasi ke ${atob(
                email.email!
              )}.
Silahkan mengunjungi Email Anda dan klik link pada email tersebut.`}
            </p>
            <Button
              type='primary'
              htmlType='submit'
              className='btn-email'
              onClick={openEmail}
            >
              Buka Email
            </Button>
            <div className='divider' />
            <p className='subtitle' style={{ marginTop: "24px" }}>
              Belum mendapat email?
            </p>
            <p className='subtitle'>
              <span className='resend-email' onClick={resendEmail}>
                Kirim ulang
              </span>
            </p>
          </>
        )}
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          opacity: 0.5,
          position: "absolute",
          backgroundColor: "#000",
          display: isLoading ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingOutlined
          style={{
            fontSize: "50px",
            color: "#fff",
          }}
        />
      </div>
    </div>
  );
};

export default ConfirmationPage;
