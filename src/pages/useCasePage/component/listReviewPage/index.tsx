import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import iconFilter from "../../../../assets/images/filter-icon.png";
import HeaderUsecase from "../header";
import "./styles.scss";

const ListReviewPage = () => {
    const navigate = useNavigate()
    const dataRespon = [
        {
            key: 1,
            id: "ID328721",
            time: "5 November 2023 09.00"
        },
        {
            key: 2,
            id: "ID328722",
            time: "6 November 2023 09.00"
        },
        {
            key: 3,
            id: "ID328723",
            time: "7 November 2023 09.00"
        }
    ]
    return (
        <>
            <HeaderUsecase />
            <div className="list-review-page">
                <div className="list-card">
                    <div className="header-card">
                        <p className="title-card">List Respon</p>
                        <img src={iconFilter} />
                    </div>
                    <div className="content-card">
                        {dataRespon.map((item) => (
                            <div className="card-respon">
                                <p className="id-respon">{item.id}</p>
                                <p className="time-respon">{item.time}</p>
                                <RightOutlined className="icon-navigate" onClick={() => navigate('/detail-review')} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListReviewPage