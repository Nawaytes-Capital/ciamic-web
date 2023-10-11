import { MoreOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons"
import { Button, Col, Input, Row } from "antd"
import { useState } from "react";
import people from "../../assets/images/people-img.png";
import logo from "../../assets/images/logo-ciamic.png";
import "./styles.scss";

const ChatBotPage = () => {
    const [question, setQuestion] = useState<string>("");
    const defaultChat = [
        {
            id: 1,
            chat: "Hallo! Saya adalah Asisten virtual untuk AM. Teman kolaborasi yang siap membantu Anda. Saat ini, Saya masih memiliki keterbatasan untuk memberikan rekomendasi dan tidak selallu benar. Bantu saya dengan memilih apa yang sedang kamu butuhkan.",
            sender: "admin"
        },
        // {
        //     id: 2,
        //     chat: "Hallo, saya customer",
        //     sender: "customer"
        // },
    ]
    const [chat, setChat] = useState(defaultChat)
    const recomendQuestion = [
        {
            id: 1,
            question: "Bagaimana cara mendaftarkan akun email di Telkom ?"
        },
        {
            id: 2,
            question: "Apa Itu Big Box ?"
        },
        {
            id: 3,
            question: "Keunggulan Produk Produk Telkom"
        }
        ,{
            id: 4,
            question: "Tutorial Mendaftar Akun Chatbot"
        }
    ]
    const sendChat = () => {
        const payload = [
            {
                id: question.length + 1,
                chat: question,
                sender: "customer"
            },
            {
                id: question.length + 2,
                chat: "Produk masih dalam tahap pengembangan",
                sender: "admin"
            }
        ]
        setChat([...chat, ...payload])
        setQuestion("")
    }
    return (
        <div className="chatbot-wp">
            <div className="section-left">
                <Button className="btn-add" icon={<PlusOutlined />}>New Chat</Button>
                <div className="history-chat">
                    <p className="title">Riwayat Pertanyaan</p>
                    {chat.filter((item) => item.sender === "customer").map((item) => (
                        <div className="bubble-wp">{item.chat}</div>
                    ))}
                </div>
                <div className="account-wp">
                    <div className="img-wp">
                        <img src={people} />
                    </div>
                    <p className="name">Mubarok Al Fatih</p>
                    <MoreOutlined className="btn-more" />
                </div>
            </div>
            <div className="section-right">
                <div className="chat-wp">
                    {chat.map((item) => {
                        return (
                            <div className="buble-chat">
                                <div className="img-wp">
                                    {item.sender === "admin" ? (
                                        <img className="img-admin" src={logo} />
                                    ): (
                                        <img className="img-cust" src={people} />
                                    )}
                                </div>
                                <p className={`chat ${item.sender === "customer" && 'chat-cust'}`}>
                                    {item.chat}
                                </p>
                            </div>
                        )
                    })}
                </div>
                {chat.length < 2 && (
                    <div className="recomend-question">
                        <p>Pertanyaan yang sering ditanyakan</p>
                        <div className="recomend-wp">
                            <Row gutter={16} style={{width: "100%"}}>
                                {recomendQuestion.map((item) => {
                                    return (
                                        <Col className="gutter-row" span={12}>
                                            <div className="recomend-box" onClick={() => setQuestion(item.question)}>
                                                {item.question}
                                            </div>
                                        </Col>
                                    )  
                                })}
                            </Row>
                        </div>
                    </div>
                )}
                <div className="input-wp">
                    <Input
                        type="text"
                        className="input-question"
                        style={{height: "48px"}}
                        value={question}
                        // suffix={}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <SendOutlined className="btn-icon" onClick={() => sendChat()} />
                </div>
            </div>
        </div>
    )
}

export default ChatBotPage