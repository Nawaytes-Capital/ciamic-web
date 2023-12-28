import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import HeaderUsecase from "../header";
import "./styles.scss";
import { getDetailResponseApi } from "../../../../api/useCase";
import { AxiosError } from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { logoutApp } from "../../../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";

interface IDataResponse {
  key: number;
  question: string;
  answer: string;
}

const DetailReviewPage = () => {
  const navigate = useNavigate();

  const { usecaseId } = useParams();
  const [dataRespon, setDataRespon] = useState<IDataResponse[]>([]);

  const decodeBase64 = (str: string) => {
    // the format string is id+title
    const decode = atob(str);
    const split = decode.split("+");
    const id = split[0];
    const title = split[1];
    return { id, title };
  };
  const data = [
    {
      key: 1,
      question: "Siapa Kompetitor Untuk Layanan Astinet",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      key: 2,
      question: "Siapa Kompetitor Untuk Layanan Astinet",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      key: 3,
      question: "Siapa Kompetitor Untuk Layanan Astinet",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      key: 4,
      question: "Siapa Kompetitor Untuk Layanan Astinet",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      key: 5,
      question: "Siapa Kompetitor Untuk Layanan Astinet",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      key: 6,
      question: "Siapa Kompetitor Untuk Layanan Astinet",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];
  const dispatch = useDispatch<AppDispatch>();
  const getDataRespon = async () => {
    try {
      const response = await getDetailResponseApi(decodeBase64(usecaseId!).id);
      const payload: IDataResponse[] = response.data.data.response.map(
        (item, index) => {
          return {
            key: item.question_id,
            question: item.question_text,
            answer: item.answer,
          };
        }
      );
      setDataRespon(payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logoutApp());
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
      <div className='detail-review-page'>
        <div className='list-card'>
          <div className='header-card'>
            <LeftOutlined
              className='icon-navigate'
              onClick={() => navigate("/list-review")}
              style={{ marginRight: "14px" }}
            />
            <p className='title-card'>{decodeBase64(usecaseId!).title}</p>
          </div>
          <div className='content-detail'>
            {dataRespon.map((item, index) => (
              <div className='review-wrapper'>
                <div className='question'>
                  <p className='number'>{item.key}</p>
                  <p className='text'>{item.question}</p>
                </div>
                <div className='answer'>{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailReviewPage