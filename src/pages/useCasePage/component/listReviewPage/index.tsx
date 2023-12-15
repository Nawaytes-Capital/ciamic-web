import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import iconFilter from "../../../../assets/images/filter-icon.png";
import HeaderUsecase from "../header";
import "./styles.scss";
import { useEffect, useState } from "react";
import { getHistoryResponseApi } from "../../../../api/useCase";
import { AxiosError } from "axios";
import { Divider, Skeleton, message } from "antd";

interface IDataResponse {
  key: number;
  id: string;
  time: string;
}
const ListReviewPage = () => {
  const navigate = useNavigate();
  const [dataRespon, setDataRespon] = useState<IDataResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //   const dataRespon = [
  //     {
  //       key: 1,
  //       id: "ID328721",
  //       time: "5 November 2023 09.00",
  //     },
  //     {
  //       key: 2,
  //       id: "ID328722",
  //       time: "6 November 2023 09.00",
  //     },
  //     {
  //       key: 3,
  //       id: "ID328723",
  //       time: "7 November 2023 09.00",
  //     },
  //   ];

  const getDataRespon = async () => {
    try {
      setLoading(true);
      const response = await getHistoryResponseApi();
      const data = response.data.data.map((item, index) => {
        return {
          key: index,
          id: item._id,
          time: new Intl.DateTimeFormat("id-ID", {
            dateStyle: "full",
            timeStyle: "short",
          }).format(new Date(item.created_at)),
        };
      });
      setDataRespon(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          navigate("/usecase");
        }
      } else {
        message.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getDataRespon();
  }, []);

  return (
    <>
      <HeaderUsecase />
      <div className='list-review-page'>
        <div className='list-card'>
          <div className='header-card'>
            <p className='title-card'>List Respon</p>
            <img src={iconFilter} />
          </div>
          <div className='content-card'>
            {/* {dataRespon.map((item) => (
              <div className='card-respon'>
                <p className='id-respon'>{item.id}</p>
                <p className='time-respon'>{item.time}</p>
                <RightOutlined
                  className='icon-navigate'
                  onClick={() => navigate(`/detail-review/${item.id}`)}
                />
              </div>
            ))} */}
            {loading ? (
              <div className='card-respon'>
                <Skeleton.Input active size='small' className='skeleton' />
                <Skeleton.Input active size='small' className='skeleton' />
              </div>
            ) : dataRespon.length > 0 ? (
              dataRespon.map((item) => (
                <div key={item.id} className='card-respon'>
                  <p className='id-respon'>{item.id}</p>
                  <p className='time-respon'>{item.time}</p>
                  <RightOutlined
                    className='icon-navigate'
                    onClick={() => navigate(`/detail-review/${item.id}`)}
                  />
                </div>
              ))
            ) : (
              <div className='card-respon'>
                <p className='id-respon'>No Data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListReviewPage