import { Button, Form, Input } from "antd";
import { useState } from "react";
import icon from '../../assets/images/icon-confirmation1.png';
import icon2 from '../../assets/images/icon-confirmation2.png';
import './styles.scss'

const ConfirmationPage = () => {
  const [confirm, setConfirm] =useState<boolean>(false)
  return (
    <div className="confirmation-container">
        <div className="confirmation-wp">
          {confirm ? (
            <>
              <img src={icon2} className="icon" />
              <p className="title">Email Berhasil Terdaftar</p>
              <p className="subtitle">Selamat Email kamu berhasil terdaftar di Ciamic.</p>
              <Button type="primary" htmlType="submit" className="btn-email">
                Login Untuk Melanjutkan
              </Button>
            </>
          ): (
            <>
              <img src={icon} className="icon" />
              <p className="title">Konfirmasi Email</p>
              <p className="subtitle"> Kami telah mengirimkan Email Konfirmasi ke alfatih@telkom.co.id Silahkan mengunjungi Email Anda dan klik link pada email tersebut.</p>
              <Button type="primary" htmlType="submit" className="btn-email">
                Buka Email
              </Button>
              <div className="divider" />
              <p className="subtitle" style={{marginTop: "24px"}}>Belum mendapat email?</p>
              <p className="subtitle"><span>Kirim ulang</span></p>
            </>
          )}
        </div>
    </div>
  )
}

export default ConfirmationPage;