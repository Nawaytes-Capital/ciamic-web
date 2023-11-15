import { CloseSquareOutlined, CopyOutlined, DislikeOutlined, LikeOutlined, MenuOutlined, MoreOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons"
import { Button, Col, Input, Popover, Row } from "antd";
import { useEffect, useState } from "react";
import people from "../../assets/images/people-img.png";
import logo from "../../assets/images/logo-ciamic.png";
import "./styles.scss";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryChat } from "../../redux/features/chatbot/history/historyChatSlice";

const { TextArea } = Input;

const content = (
  <div>
    <Button
      onClick={() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        window.location.href = "/";
      }}
      className='btn-logout'
    >
      Logout
    </Button>
  </div>
);

const ChatBotPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const historyChatState = useSelector((state: RootState) => state.historyChat);

  const [question, setQuestion] = useState<string>("");
  const [isFullmenu, setFullmenu] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (accessToken) dispatch(getHistoryChat(accessToken || ""));
  }, [dispatch, accessToken]);

  const defaultChat = [
    {
      id: 1,
      chat: "Hallo! Saya adalah Asisten virtual untuk AM. Teman kolaborasi yang siap membantu Anda. Saat ini, Saya masih memiliki keterbatasan untuk memberikan rekomendasi dan tidak selallu benar. Bantu saya dengan memilih apa yang sedang kamu butuhkan.",
      sender: "admin",
    },
  ];
  const [chat, setChat] = useState(defaultChat);
  const recomendQuestion = [
    {
      id: 1,
      question: "Bagaimana cara mendaftarkan akun email di Telkom ?",
    },
    {
      id: 2,
      question: "Apa Itu Big Box ?",
    },
    {
      id: 3,
      question: "Keunggulan Produk Produk Telkom",
    },
    {
      id: 4,
      question: "Tutorial Mendaftar Akun Chatbot",
    },
  ];
  const sendChat = () => {
    if (question.length > 0) {
      const payload = [
        {
          id: question.length + 1,
          chat: question,
          sender: "customer",
        },
        {
          id: question.length + 2,
          chat: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          sender: "admin",
        },
      ];
      setChat([...chat, ...payload]);
      setQuestion("");
    }
  };

  useEffect(() => {
    const storageAccessToken = localStorage.getItem("access_token");
    const storageUser = localStorage.getItem("user");
    if (!storageAccessToken || !storageUser) {
      window.location.href = "/";
    } else {
      setAccessToken(storageAccessToken);
      setUser(JSON.parse(storageUser));
    }

    setIsLoading(false);
  }, []);
  if (isLoading) return <div></div>;
  if (!accessToken) return <div>.</div>;
  return (
    <div className='chatbot-wp'>
      <div className={`section-left ${isFullmenu && "active"}`}>
        <Button className='btn-add' icon={<PlusOutlined />}>
          New Chat
        </Button>
        <div className='history-chat'>
          <div className='buble-container'>
            {/* {chat
              .filter((item) => item.sender === "customer")
              .map((item) => (
                <div className='bubble-wp'>{item.chat}</div>
              ))} */}
            <p className='title'>Today</p>
            {historyChatState.data?.data?.today.map((item: any) => {
              return <div className='bubble-wp'>{item.message}</div>;
            })}
            <p className='title'>7 Hari Terakhir</p>
            {historyChatState.data?.data?.week_before.map((item: any) => {
              return <div className='bubble-wp'>{item.message}</div>;
            })}
          </div>
        </div>
        <div className='account-wp'>
          <div className='img-wp'>
            <img src={people} />
          </div>
          <p className='name'>{user?.name}</p>
          <Popover placement='topRight' title={"Menu"} content={content}>
            <MoreOutlined className='btn-more' />
          </Popover>
        </div>
      </div>
      <div className='section-right'>
        <div className={`header-mobile ${isFullmenu && "after-active"}`}>
          {isFullmenu ? (
            <CloseSquareOutlined
              onClick={() => setFullmenu(false)}
              style={{ fontSize: "24px" }}
            />
          ) : (
            <MenuOutlined onClick={() => setFullmenu(true)} />
          )}
        </div>
        <div className='chat-wp'>
          {chat.map((item, index) => {
            const feedbackValidation = item.sender === "admin" && item.id !== 1;
            const suggestionChat =
              chat.length > 2 &&
              chat.length === index + 1 &&
              item.sender === "admin";
            return (
              <div className='buble-chat'>
                <div className='img-wp'>
                  {item.sender === "admin" ? (
                    <img className='img-admin' src={logo} />
                  ) : (
                    <img className='img-cust' src={people} />
                  )}
                </div>
                <p
                  className={`chat ${
                    item.sender === "customer" ? "chat-cust" : "chat-admin"
                  }`}
                >
                  {item.chat}
                </p>
                {feedbackValidation && (
                  <div className='feedback-wp'>
                    <CopyOutlined className='icon-copy' />
                    <LikeOutlined className='icon-like' />
                    <DislikeOutlined className='icon-unlike' />
                  </div>
                )}
                {suggestionChat && (
                  <div className='suggestion-wp'>
                    <div className='chat-wp'>
                      Kelebihan Astinet Kebanding Kompetitor
                    </div>
                    <div className='chat-wp'>Cara Mendaftar Astinet</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        ;
        {chat.length < 2 && (
          <div className='recomend-question'>
            <p>Pertanyaan yang sering ditanyakan</p>
            <div className='recomend-wp'>
              <Row gutter={16} style={{ width: "100%" }}>
                {recomendQuestion.map((item) => {
                  return (
                    <Col className='gutter-row' span={12}>
                      <div
                        className='recomend-box'
                        onClick={() => setQuestion(item.question)}
                      >
                        {item.question}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        )}
        <div className='input-wp'>
          <TextArea
            className='input-question'
            placeholder='Autosize height based on content lines'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            autoSize
          />
          <SendOutlined className='btn-icon' onClick={() => sendChat()} />
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage