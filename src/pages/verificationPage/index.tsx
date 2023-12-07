import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import icon from "../../assets/images/icon-confirmation1.png";
import icon2 from "../../assets/images/icon-confirmation2.png";
import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import { verifyApi } from "../../api/auth";

const VerificationPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [iserror, setIserror] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleHomepage = () => {
    navigate("/");
  };
  const handleVerify = async () => {
    try {
      await verifyApi(params.token!);
      setLoading(false);
    } catch (err) {
      setIserror(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleVerify();
  }, []);

  useEffect(() => {
    if (iserror) {
      message.error("Gagal verifikasi");
    }
  }, [iserror]);

  if (iserror) {
    return (
      <div className='confirmation-container'>
        <div className='confirmation-wp'>
          <p className='title'>Terjadi Kesalahan</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <></>;
  }

  return (
    <div className='confirmation-container'>
      <div className='confirmation-wp'>
        <img src={icon2} className='icon' />
        <p className='title'>Email Berhasil Terdaftar</p>
        <p className='subtitle'>
          Selamat Email kamu berhasil terdaftar di Ciamic.
        </p>
        <Button
          type='primary'
          htmlType='submit'
          className='btn-email'
          onClick={handleHomepage}
        >
          Login Untuk Melanjutkan
        </Button>
      </div>
    </div>
  );
};

export default VerificationPage;
