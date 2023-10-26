import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useState } from "react";
import { ModalAdd } from "./components/modalAdd";
import "./styles.scss";
import { useFormik } from "formik";

interface IAddBatch {
    id_batch: string,
    question: string[],
}

const dataSource = [
    {
      key: '1',
      id: 'ID328721',
      question: '10 Pertanyaan',
      response: '20 Response',
      status: 'Done'
    },
    {
        key: '2',
        id: 'ID328722',
        question: '10 Pertanyaan',
        response: '20 Response',
        status: 'Draft'
    },
    {
        key: '3',
        id: 'ID328723',
        question: '10 Pertanyaan',
        response: '20 Response',
        status: 'Done'
    },
];
const UsecasePage = () => {
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
            title: 'Pertanyaan',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Respons',
            dataIndex: 'response',
            key: 'response',
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
                    <EditOutlined />
                );
            },
        },
    ]
    const form = useFormik<IAddBatch>({
        initialValues: {
            id_batch: "",
            question: [],
        },
        enableReinitialize: true,
        // validationSchema: validation,
        onSubmit: async(values) => {
            console.log("add batch : ", values);
        },
    });
    return (
        <div id="usecase-dashboard">
            <div className="header-wp">
                <h3 className="title-page">List Batch Usecase</h3>
                <Button className="btn-add" onClick={() => setIsShow(true)}>Kunjungan Baru <PlusOutlined style={{marginLeft: "8px"}} /></Button>
            </div>
            <Table className="table-wp" dataSource={dataSource} columns={columns} />
            <ModalAdd isShow={isShow} handleCancel={() => setIsShow(false)} form={form} handleSubmit={form.handleSubmit} />
        </div>
    )
}

export default UsecasePage;