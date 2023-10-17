import { useNavigate } from "react-router-dom";
import image from "../../../../assets/images/img-success.png";
import HeaderUsecase from "../header";
import "./styles.scss";

const SuccessPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <HeaderUsecase />
            <div className="success-page">
                <img src={image} className="img-illustration"  />
                <p style={{marginTop: "14px"}}>Jawaban kamu berhasil disimpan!</p>
                <p className="link" onClick={() => navigate('/list-review')}>Lihat Riwayat Respon</p>
                <p className="link" onClick={() => navigate('/usecase-form')}>Berikan Jawaban Lain</p>
            </div>
        </>
    )
}

export default SuccessPage