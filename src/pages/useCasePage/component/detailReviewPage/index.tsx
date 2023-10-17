import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import HeaderUsecase from "../header";
import "./styles.scss";

const DetailReviewPage = () => {
    const navigate = useNavigate()
    const data = [
        {
            key: 1,
            question: "Siapa Kompetitor Untuk Layanan Astinet",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            key: 2,
            question: "Siapa Kompetitor Untuk Layanan Astinet",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            key: 3,
            question: "Siapa Kompetitor Untuk Layanan Astinet",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            key: 4,
            question: "Siapa Kompetitor Untuk Layanan Astinet",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            key: 5,
            question: "Siapa Kompetitor Untuk Layanan Astinet",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            key: 6,
            question: "Siapa Kompetitor Untuk Layanan Astinet",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
    ]
    return (
        <>
            <HeaderUsecase />
            <div className="detail-review-page">
                <div className="list-card">
                    <div className="header-card">
                        <LeftOutlined className="icon-navigate" onClick={() => navigate('/list-review')} style={{marginRight: "14px"}}/>
                        <p className="title-card">ID328721</p>
                    </div>
                    <div className="content-detail">
                        {data.map((item, index) => (
                            <div className="review-wrapper">
                                <div className="question">
                                    <p className="number">{index + 1}</p>
                                    <p className="text">{item.question}</p>
                                </div>
                                <div className="answer">
                                    {item.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailReviewPage