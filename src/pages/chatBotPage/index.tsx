import { CloseSquareOutlined, CopyOutlined, DislikeOutlined, LikeOutlined, MenuOutlined, MoreOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons"
import { Button, Col, Input, Popover, Row, message } from "antd";
import { useEffect, useState } from "react";
import people from "../../assets/images/people-img.png";
import logo from "../../assets/images/logo-ciamic.png";
import "./styles.scss";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getHistoryChat,
  resetHistoryChat,
} from "../../redux/features/chatbot/history/historyChatSlice";
import { useNavigate } from "react-router-dom";
import { generateChatRoom } from "../../redux/features/chatbot/chatRoom/chatRoomSlice";
import { sendChatApi } from "../../api/chatbot";
import { addChat } from "../../redux/features/chatbot/chat/chatSlice";

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
  const chatRoomState = useSelector((state: RootState) => state.chatRoom);
  const chatState = useSelector((state: RootState) => state.chat);
  const navigate = useNavigate();

  const [question, setQuestion] = useState<string>("");
  const [isFullmenu, setFullmenu] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loadingChat, setLoadingChat] = useState(false);
  useEffect(() => {
    if (accessToken) {
      dispatch(getHistoryChat(accessToken || ""));
      dispatch(generateChatRoom(accessToken || ""));
    }
  }, [dispatch, accessToken]);

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
  const sendChat = async () => {
    try {
      setLoadingChat(true);
      dispatch(
        addChat({
          id: chatState.chats.length,
          message: question,
          type: "user",
        })
      );
      const chatResponse = await sendChatApi(accessToken || "", {
        chat: question,
        room_id: chatRoomState.roomId!,
      });
      setLoadingChat(false);
      dispatch(
        addChat({
          id: chatState.chats.length + 1,
          message: chatResponse?.data?.data?.output,
          type: "bot",
          like: null,
        })
      );
    } catch (error: any) {
      console.log(error);
    }
    setQuestion("");
  };

  useEffect(() => {
    const storageAccessToken = localStorage.getItem("access_token");
    const storageUser = localStorage.getItem("user");
    if (!storageAccessToken || !storageUser) {
      navigate("/");
    } else {
      setAccessToken(storageAccessToken);
      setUser(JSON.parse(storageUser));
    }

    setIsLoading(false);
  }, []);

  if (isLoading) return <div></div>;
  if (!accessToken) {
    message.error({
      content: `Sesi anda telah berakhir, silahkan login kembali`,
    });
    navigate("/");
  }
  if (historyChatState.error) {
    message.error({
      content: `Sesi anda telah berakhir, silahkan login kembali`,
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    dispatch(resetHistoryChat());
    navigate("/");
  }
  return (
    <div className='chatbot-wp'>
      <div className={`section-left ${isFullmenu && "active"}`}>
        <Button className='btn-add' icon={<PlusOutlined />}>
          New Chat
        </Button>
        <div className='history-chat'>
          <div className='buble-container'>
            <p className='title'>Today</p>
            {historyChatState.data?.data?.today &&
              [...historyChatState.data?.data?.today]
                .reverse()
                .map((item: any, index: number) => (
                  <div key={index} className='bubble-wp'>
                    {item.message}
                  </div>
                ))}
            <p className='title'>7 Hari Terakhir</p>
            {historyChatState.data?.data?.week_before &&
              [...historyChatState.data?.data?.week_before]
                .reverse()
                .map((item: any) => {
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
          {chatState.chats.map((item, index) => {
            return (
              <div className='buble-chat'>
                <div className='img-wp'>
                  {item.type === "user" ? (
                    <img className='img-cust' src={people} />
                  ) : (
                    <img className='img-admin' src={logo} />
                  )}
                </div>
                <p
                  className={`chat ${
                    item.type === "user" ? "chat-cust" : "chat-admin"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: item.message.replace(/\n/g, "<br />"),
                  }}
                ></p>
                {item.type === "bot" && index !== 0 && (
                  <div className='feedback-wp'>
                    <CopyOutlined
                      className='icon-copy'
                      onClick={() => {
                        navigator.clipboard.writeText(item.message);
                        message.success({
                          content: `Chatbot berhasil dicopy`,
                        });
                      }}
                    />
                    <LikeOutlined
                      className={`icon-like ${item.like ? "icon-liked" : ""}`}
                    />
                    <DislikeOutlined
                      className={`icon-unlike ${
                        item.like === false ? "icon-unliked" : ""
                      }`}
                    />
                  </div>
                )}
                {item.type === "bot" &&
                  item.id !== 0 &&
                  item.id === chatState.chats.length - 1 && (
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

        {chatState.chats.length === 1 && (
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
            disabled={loadingChat}
            placeholder='Type A Messages'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            autoSize
          />
          <SendOutlined
            className='btn-icon'
            disabled={loadingChat}
            onClick={() => sendChat()}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage