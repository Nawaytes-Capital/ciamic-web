import { CloseSquareOutlined, CopyOutlined, DislikeOutlined, LikeOutlined, MenuOutlined, MoreOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons"
import { Button, Col, Input, Row } from "antd"
import { useState } from "react";
import people from "../../assets/images/people-img.png";
import logo from "../../assets/images/logo-ciamic.png";
import "./styles.scss";
const { TextArea } = Input;
const ChatBotPage = () => {
    const [question, setQuestion] = useState<string>("");
    const [isFullmenu, setFullmenu] = useState<boolean>(false)
    const defaultChat = [
        {
            id: 1,
            chat: "Hallo! Saya adalah Asisten virtual untuk AM. Teman kolaborasi yang siap membantu Anda. Saat ini, Saya masih memiliki keterbatasan untuk memberikan rekomendasi dan tidak selallu benar. Bantu saya dengan memilih apa yang sedang kamu butuhkan.",
            sender: "admin"
        },
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
        if(question.length > 0){
            const payload = [
                {
                    id: question.length + 1,
                    chat: question,
                    sender: "customer"
                },
                {
                    id: question.length + 2,
                    chat: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                    sender: "admin"
                }
            ]
            setChat([...chat, ...payload])
            setQuestion("")
        }
    }
    return (
        <div className="chatbot-wp">
            <div className={`section-left ${isFullmenu && 'active'}`}>
                <Button className="btn-add" icon={<PlusOutlined />}>New Chat</Button>
                <div className="history-chat">
                    <p className="title">Riwayat Pertanyaan</p>
                    <div className="buble-container">
                        {chat.filter((item) => item.sender === "customer").map((item) => (
                            <div className="bubble-wp">{item.chat}</div>
                        ))}
                    </div>
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
                <div className={`header-mobile ${isFullmenu && 'after-active'}`}>
                    {isFullmenu ? (
                        <CloseSquareOutlined onClick={() => setFullmenu(false)} style={{fontSize: "24px"}} />
                    ): (
                        <MenuOutlined onClick={() => setFullmenu(true)} />
                    )}
                </div>
                <div className="chat-wp">
                    {chat.map((item, index) => {
                        const feedbackValidation = item.sender === "admin" && item.id !== 1;
                        const suggestionChat = chat.length > 2 && chat.length === index + 1 && item.sender === "admin"
                        return (
                            <div className="buble-chat">
                                <div className="img-wp">
                                    {item.sender === "admin" ? (
                                        <img className="img-admin" src={logo} />
                                    ): (
                                        <img className="img-cust" src={people} />
                                    )}
                                </div>
                                <p className={`chat ${item.sender === "customer" ? 'chat-cust': 'chat-admin'}`}>
                                    {item.chat}
                                </p>
                                {feedbackValidation && (
                                    <div className="feedback-wp">
                                        <CopyOutlined className="icon-copy" />
                                        <LikeOutlined className="icon-like" />
                                        <DislikeOutlined className="icon-unlike" />
                                    </div>
                                )}
                                {suggestionChat && (
                                    <div className="suggestion-wp">
                                        <div className="chat-wp">Kelebihan Astinet Kebanding Kompetitor</div>
                                        <div className="chat-wp">Cara Mendaftar Astinet</div>
                                    </div>
                                )}
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
                    <TextArea 
                        className="input-question"
                        placeholder="Autosize height based on content lines" 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        autoSize 
                    />
                    <SendOutlined className="btn-icon" onClick={() => sendChat()} />
                </div>
            </div>
        </div>
    )
}

export default ChatBotPage