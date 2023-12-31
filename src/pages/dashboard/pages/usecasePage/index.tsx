import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Pagination, Table, message } from "antd";
import { useEffect, useState } from "react";
import { ModalAdd } from "./components/modalAdd";
import "./styles.scss";
import { fetchUsecasebatchApi } from "../../../../api/dashboard";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { FetchUsecaseBatchApiResponse } from "../../../../api/interface/FetchUsecaseBatch";

interface IUsecaseBatchData {
  key: string;
  id: string;
  question: string;
  response: string;
  status: string;
}

const dataSource = [
  {
    key: "1",
    id: "ID328721",
    question: "10 Pertanyaan",
    response: "20 Response",
    status: "Done",
  },
  {
    key: "2",
    id: "ID328722",
    question: "10 Pertanyaan",
    response: "20 Response",
    status: "Draft",
  },
  {
    key: "3",
    id: "ID328723",
    question: "10 Pertanyaan",
    response: "20 Response",
    status: "Done",
  },
];

const UsecasePage = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [data, setData] = useState<IUsecaseBatchData[]>([]);
  const [fetchResponse, setFetchResponse] =
    useState<FetchUsecaseBatchApiResponse>();
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetchUsecasebatchApi(authState.accessToken!, page);
      setFetchResponse(response.data);
      const dataSet: IUsecaseBatchData[] = response.data.data.map(
        (item, index) => {
          return {
            key: item._id,
            id: item._id,
            question: `${item.question.length} Pertanyaan`,
            response: `${item.count_response} Response`,
            status: item.status.toUpperCase(),
          };
        }
      );

      setData(dataSet);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          message.error({
            content: error?.response?.data?.message,
          });
          navigate("/dashboard");
        }
      }
      message.error({
        content: "Something went wrong",
      });
      navigate("/dashboard");
    }
  };

  useEffect(
    () => {
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string, record: any, index: number) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "ID Batch Usecase",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Pertanyaan",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Respons",
      dataIndex: "response",
      key: "response",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: any, index: number) => {
        return <div className={`${text.toLowerCase()}`}>{text}</div>;
      },
      align: "center" as "center",
    },
    // {
    //   title: "Action",
    //   render: (text: string, record: any, index: number) => {
    //     return <EditOutlined />;
    //   },
    // },
  ];
  return (
    <div id='usecase-dashboard'>
      <div className='header-wp'>
        <h3 className='title-page'>List Batch Usecase</h3>
        <Button className='btn-add' onClick={() => setIsShow(true)}>
          Add UseCase <PlusOutlined style={{ marginLeft: "8px" }} />
        </Button>
      </div>
      <Table
        className='table-wp'
        dataSource={data}
        columns={columns}
        pagination={false}
      />
      <Pagination
        className='pagination-wp'
        defaultCurrent={1}
        current={page}
        onChange={(page) => setPage(page)}
        total={fetchResponse?.total}
        showSizeChanger={false}
      />
      <ModalAdd isShow={isShow} handleCancel={() => setIsShow(false)} />
    </div>
  );
};

export default UsecasePage;