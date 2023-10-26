import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useState } from "react";
import { ModalListQuestion } from "./components/modalListQuestion";
// import "./styles.scss";

const dataSource = [
    {
      key: '1',
      id: 'ID328721',
      answer: '10 Jawaban',
      status: 'Done'
    },
    {
        key: '2',
        id: 'ID328722',
        answer: '10 Jawaban',
        status: 'Draft'
    },
    {
        key: '3',
        id: 'ID328723',
        answer: '10 Jawaban',
        status: 'Done'
    },
];

const dataQuestions = [
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
const ResponsePage = () => {
    const [isShow, setIsShow] = useState(false)
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            render: (text: string, record: any, index: number) => {
                return (
                    <p>{index + 1}</p>
                );
            },
        },
        {
            title: 'ID Batch Usecase',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Jawaban',
            dataIndex: 'answer',
            key: 'answer',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string, record: any, index: number) => {
                return (
                    <div className={`${text.toLowerCase()}`}>
                        {text}
                    </div>
                );
            },
        },
        {
            title: 'Action',
            render: (text: string, record: any, index: number) => {
                return (
                    <div onClick={() => setIsShow(true)}>Lihat Detail</div>
                );
            },
        },
    ]

    const handleSubmit = () => {
        //
    }
    return (
        <div id="usecase-dashboard">
            <div className="header-wp">
                <h3 className="title-page">List Response</h3>
                <Button className="btn-add" onClick={() => setIsShow(true)}>Download as CSV <PlusOutlined style={{marginLeft: "8px"}} /></Button>
            </div>
            <Table className="table-wp" dataSource={dataSource} columns={columns} />
            <ModalListQuestion isShow={isShow} handleCancel={() => setIsShow(false)} data={dataQuestions} handleSubmit={handleSubmit} />
        </div>
    )
}

export default ResponsePage;