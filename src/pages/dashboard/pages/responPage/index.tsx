import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination, Table, message } from "antd";
import { useEffect, useState } from "react";
import { ModalListQuestion } from "./components/modalListQuestion";
import {
  fetchUsecasebatchApi,
  getBatchResultApi,
} from "../../../../api/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { FetchUsecaseBatchApiResponse } from "../../../../api/interface/FetchUsecaseBatch";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
// import "./styles.scss";

interface IDataSource {
  key: string;
  id: string;
  answer: string;
  status: string;
}

const dataSource = [
  {
    key: "1",
    id: "ID328721",
    answer: "10 Jawaban",
    status: "Done",
  },
  {
    key: "2",
    id: "ID328722",
    answer: "10 Jawaban",
    status: "Draft",
  },
  {
    key: "3",
    id: "ID328723",
    answer: "10 Jawaban",
    status: "Done",
  },
];

export interface IDataQuestions {
  key: number;
  id?: string;
  question: string;
  answer: string[];
}

const dataQuestions = [
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
const ResponsePage = () => {
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState<IDataSource[]>();
  const [answer, setAnswer] = useState<IDataQuestions[]>([]);
  const authState = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState<number>(1);
  const [fetchResponse, setFetchResponse] =
    useState<FetchUsecaseBatchApiResponse>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setData([]);
      const response = await fetchUsecasebatchApi(authState.accessToken!, page);
      setFetchResponse(response.data);
      const dataSet: IDataSource[] = response.data.data.map((item, index) => {
        return {
          key: item._id,
          id: item._id,
          answer: `${item.count_response} Jawaban`,
          status: item.status,
        };
      });
      setIsLoading(false);
      setData(dataSet);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          message.error({
            content: error?.response?.data?.message,
          });
          navigate("/dashboard");
          return;
        }
      }
      message.error({
        content: "Something went wrong",
      });
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDetailClick = async (index: number) => {
    try {
      const id = data![index].id;
      const response = await getBatchResultApi(id, authState.accessToken!);
      const payload: IDataQuestions[] = response.data.data.map(
        (item, index) => {
          return {
            key: index,
            id,
            question: item.question,
            answer: item.response,
          };
        }
      );
      setAnswer(payload);
      setIsShow(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          message.error({
            content: error?.response?.data?.message,
          });
          navigate("/dashboard");
        }
        return;
      }
      message.error({
        content: "Something went wrong",
      });
      navigate("/dashboard");
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string, record: any, index: number) => {
        return <p>{(page - 1) * 10 + index + 1}</p>;
      },
    },
    {
      title: "ID Batch Usecase",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Jawaban",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: any, index: number) => {
        return <div className={`${text.toLowerCase()}`}>{text}</div>;
      },
    },
    {
      title: "Action",
      render: (text: string, record: any, index: number) => {
        return (
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleDetailClick(index)}
          >
            Lihat Detail
          </div>
        );
      },
    },
  ];

  const handleSubmit = () => {
    const apiUrl = new URL(process.env.REACT_APP_API_URL!);
    apiUrl.pathname = `/chatbot/admin/response-download/${answer[0].id}`;

    window.location.href = `${process.env.REACT_APP_API_URL}/chatbot/admin/response-download/${answer[0].id}`;
  };
  return (
    <div id='usecase-dashboard'>
      <div className='header-wp'>
        <h3 className='title-page'>List Response</h3>
        {/* <Button className='btn-add' onClick={() => setIsShow(true)}>
          Download as CSV <PlusOutlined style={{ marginLeft: "8px" }} />
        </Button> */}
      </div>
      <Table
        className='table-wp'
        dataSource={data}
        columns={columns}
        pagination={false}
        loading={isLoading}
      />
      <Pagination
        className='pagination-wp'
        defaultCurrent={1}
        current={page}
        onChange={(page) => setPage(page)}
        total={fetchResponse?.total}
        showSizeChanger={false}
      />
      <ModalListQuestion
        isShow={isShow}
        handleCancel={() => setIsShow(false)}
        data={answer}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ResponsePage;