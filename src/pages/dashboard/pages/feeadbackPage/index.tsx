import { Table } from "antd";
import "./styles.scss";

const dataSource = [
    {
        key: '1',
        name: 'Ahmad Arive',
        content: 'Ketika memberikan respon, chatbot terlalu lama loading, Tolong tingkatkan kecepatan loading',
        email: 'arvie@telkom.co.id'
    },
    {
        key: '2',
        name: 'Ahmad Arive',
        content: 'Ketika memberikan respon, chatbot terlalu lama loading, Tolong tingkatkan kecepatan loading',
        email: 'arvie@telkom.co.id'
    },
    {
        key: '3',
        name: 'Ahmad Arive',
        content: 'Ketika memberikan respon, chatbot terlalu lama loading, Tolong tingkatkan kecepatan loading',
        email: 'arvie@telkom.co.id'
    },
];
const ListFeedbackpage = () => {
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
            title: 'Nama Pengirim',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Isi Masukan',
            dataIndex: 'content',
            key: 'content',
        },
    ]
    
    return (
        <div id="admin-dashboard">
            <div className="header-wp">
                <h3 className="title-page">List Feedback</h3>
            </div>
            <Table className="table-wp" dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default ListFeedbackpage;