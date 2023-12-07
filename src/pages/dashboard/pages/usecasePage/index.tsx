import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import { ModalAdd } from "./components/modalAdd";
import "./styles.scss";
import { fetchUsecasebatchApi } from "../../../../api/dashboard";

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
  const [isShow, setIsShow] = useState<boolean>(false);
  const [data, setData] = useState<IUsecaseBatchData[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetchUsecasebatchApi();
      const dataSet: IUsecaseBatchData[] = response.data.data.map(
        (item, index) => {
          return {
            key: item._id,
            id: item._id,
            question: `${item.question.length} Pertanyaan`,
            response: "-",
            status: item.status.toUpperCase(),
          };
        }
      );

      setData(dataSet);
    } catch (error: any) {
      message.error({
        content: `${error?.response?.data?.message}` ?? "Something went wrong",
      });
    }
  };

  useEffect(
    () => {
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
    },
    {
      title: "Action",
      render: (text: string, record: any, index: number) => {
        return <EditOutlined />;
      },
    },
  ];
  return (
    <div id='usecase-dashboard'>
      <div className='header-wp'>
        <h3 className='title-page'>List Batch Usecase</h3>
        <Button className='btn-add' onClick={() => setIsShow(true)}>
          Kunjungan Baru <PlusOutlined style={{ marginLeft: "8px" }} />
        </Button>
      </div>
      <Table className='table-wp' dataSource={data} columns={columns} />
      <ModalAdd isShow={isShow} handleCancel={() => setIsShow(false)} />
    </div>
  );
};

export default UsecasePage;