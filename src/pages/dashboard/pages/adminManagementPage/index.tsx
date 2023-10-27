import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useState } from "react";
import { ModalAdd } from "./components/modalAdd";
import "./styles.scss";
import { useFormik } from "formik";
import * as yup from "yup";

export interface IAddAdmin {
    name: string,
    email: string,
    number_phone: string
}

const dataSource = [
    {
        key: '1',
        id: 'ID328721',
        name: 'Ahmad Arive',
        number_phone: '081219281293',
        email: 'arvie@telkom.co.id'
    },
    {
        key: '2',
        id: 'ID328722',
        name: 'Ahmad Rizal',
        number_phone: '081219281293',
        email: 'arvie@telkom.co.id'
    },
    {
        key: '3',
        id: 'ID328723',
        name: 'Ahmad Tommo',
        number_phone: '081219281293',
        email: 'arvie@telkom.co.id'
    },
];
const AdminManagementpage = () => {
    const [isShow, setIsShow] = useState(false);
    const [detail, setDetail] = useState<any>();
    const handleDetail = (data: any) => {
        setDetail(data)
        setIsShow(true)
    }
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
            title: 'ID Admin',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'No. Handphone',
            dataIndex: 'number_phone',
            key: 'number_phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            render: (text: string, record: any, index: number) => {
                return (
                    <div>
                        <EditOutlined onClick={() => handleDetail(record)} />
                        <DeleteOutlined style={{marginLeft: "8px"}} />
                    </div>
                );
            },
        },
    ]
    const validation = yup.object().shape({
        email: yup
        .string()
        .email("must be a valid email")
        .required("email is required")
        .matches(
          /^[a-zA-Z0-9._%+-]+@telkom\.co\.id$/,
          "must be a valid telkom email"
        ),
        name: yup.string().required("name is required"),
        number_phone: yup.string().required("email is required")
      });
    const form = useFormik<IAddAdmin>({
        initialValues: {
            name: detail?.name,
            email: detail?.email,
            number_phone: detail?.number_phone
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: async(values) => {
            console.log("add batch : ", values);
        },
    });
    
    return (
        <div id="admin-dashboard">
            <div className="header-wp">
                <h3 className="title-page">Admin Management</h3>
                <Button className="btn-add" onClick={() => setIsShow(true)}>Tambah Admin <PlusOutlined style={{marginLeft: "8px"}} /></Button>
            </div>
            <Table className="table-wp" dataSource={dataSource} columns={columns} />
            <ModalAdd isShow={isShow} handleCancel={() => setIsShow(false)} form={form} handleSubmit={form.handleSubmit} />
        </div>
    )
}

export default AdminManagementpage;