import { Pagination, Table, message } from "antd";
import "./styles.scss";
import { useEffect, useState } from "react";
import { fetchFeedbackApi } from "../../../../api/dashboard";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { fetchFeedbackResponse } from "../../../../api/interface/feedbackresponse.interface";

interface IFeedbackData {
  key: string;
  name: string;
  content: string;
  email: string;
}

const dataSource = [
  {
    key: "1",
    name: "Ahmad Arive",
    content:
      "Ketika memberikan respon, chatbot terlalu lama loading, Tolong tingkatkan kecepatan loading",
    email: "arvie@telkom.co.id",
  },
  {
    key: "2",
    name: "Ahmad Arive",
    content:
      "Ketika memberikan respon, chatbot terlalu lama loading, Tolong tingkatkan kecepatan loading",
    email: "arvie@telkom.co.id",
  },
  {
    key: "3",
    name: "Ahmad Arive",
    content:
      "Ketika memberikan respon, chatbot terlalu lama loading, Tolong tingkatkan kecepatan loading",
    email: "arvie@telkom.co.id",
  },
];
const ListFeedbackpage = () => {
  const [dataSet, setDataSet] = useState<IFeedbackData[]>();
  const [fetchResponse, setFetchResponse] = useState<fetchFeedbackResponse>();
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetchFeedbackApi(page);
      const data = response.data.data.map((item, index: number) => {
        return {
          key: item._id,
          name: item.name,
          content: item.notes,
          email: item.email,
        };
      });

      setDataSet(data);
      setFetchResponse(response.data);
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

  useEffect(() => {
    fetchData();
  }, [page]);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string, record: any, index: number) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Nama Pengirim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Isi Masukan",
      dataIndex: "content",
      key: "content",
    },
  ];

  return (
    <div id='admin-dashboard'>
      <div className='header-wp'>
        <h3 className='title-page'>List Feedback</h3>
      </div>
      <Table
        className='table-wp'
        dataSource={dataSet}
        columns={columns}
        pagination={false}
      />
      <Pagination
        className='pagination-wp'
        defaultCurrent={1}
        current={page}
        onChange={(page) => setPage(page)}
        total={10}
        showSizeChanger={false}
      />
    </div>
  );
};

export default ListFeedbackpage;
