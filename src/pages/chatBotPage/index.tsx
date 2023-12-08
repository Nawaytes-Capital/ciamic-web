/* eslint-disable jsx-a11y/alt-text */
import {
  CloseSquareOutlined,
  CopyOutlined,
  DislikeOutlined,
  LikeOutlined,
  MenuOutlined,
  MoreOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Popover,
  Row,
  Skeleton,
  Space,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  generateChatRoomApi,
  sendChatApi,
  sendChatFeedbackApi,
} from "../../api/chatbot";
import logo from "../../assets/images/logo-ciamic.png";
import people from "../../assets/images/people-img.png";
import { logoutApp } from "../../redux/features/auth/authSlice";
import {
  addChat,
  resetChat,
  updateLike,
} from "../../redux/features/chatbot/chat/chatSlice";
import { generateChatRoom } from "../../redux/features/chatbot/chatRoom/chatRoomSlice";
import {
  getHistoryChat,
  resetHistoryChat,
} from "../../redux/features/chatbot/history/historyChatSlice";
import { AppDispatch, RootState } from "../../redux/store";
import "./styles.scss";

const { TextArea } = Input;

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logoutApp());
    navigate("/");
  };

  return (
    <div>
      <Button onClick={handleLogout} className='btn-logout'>
        Logout
      </Button>
    </div>
  );
};

const ChatBotPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const historyChatState = useSelector((state: RootState) => state.historyChat);
  const chatRoomState = useSelector((state: RootState) => state.chatRoom);
  const chatState = useSelector((state: RootState) => state.chat);
  const navigate = useNavigate();

  const [question, setQuestion] = useState<string>("");
  const [isFullmenu, setFullmenu] = useState<boolean>(false);

  const [loadingChat, setLoadingChat] = useState(false);
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!authState.authenticated) {
      navigate("/");
    }
  }, [authState, navigate]);

  useEffect(() => {
    if (authState.authenticated) {
      dispatch(getHistoryChat(authState.accessToken || ""));
      dispatch(generateChatRoom(authState.accessToken || ""));
    }
  }, [dispatch, authState]);

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
      const chatResponse = await sendChatApi(authState.accessToken || "", {
        chat: question,
        room_id: chatRoomState.roomId!,
      });
      setLoadingChat(false);
      dispatch(
        addChat({
          id: chatState.chats.length + 1,
          message: chatResponse?.data?.data?.message,
          type: "bot",
          like: null,
          chatId: chatResponse?.data?.data?._id,
        })
      );
    } catch (error: any) {
      console.log(error);
    }
    setQuestion("");
  };

  // if (historyChatState.error) {
  //   message.error({
  //     content: `Sesi anda telah berakhir, silahkan login kembali`,
  //   });
  //   localStorage.removeItem("access_token");
  //   localStorage.removeItem("user");
  //   dispatch(resetHistoryChat());
  //   navigate("/");
  // }

  const handleFeedback = async (chatId: string, like: boolean) => {
    try {
      await sendChatFeedbackApi(authState.accessToken || "", chatId, like);
      dispatch(
        updateLike({
          chatId,
          like,
        })
      );
    } catch (error) {
      message.error({
        content: `Sesi anda telah berakhir, silahkan login kembali`,
      });
    }
  };

  if (!authState.authenticated) {
    return <Outlet />;
  }

  const handleNewChatRoom = async () => {
    try {
      await generateChatRoomApi(authState.accessToken || "");
      dispatch(resetChat());
    } catch (error) {
      message.error({
        content: `Sesi anda telah berakhir, silahkan login kembali`,
      });
    }
  };

  return (
    <div className='chatbot-wp'>
      <div className={`section-left ${isFullmenu && "active"}`}>
        <Button
          className='btn-add'
          icon={<PlusOutlined />}
          onClick={handleNewChatRoom}
        >
          Pertanyaan Baru
        </Button>
        <div className='history-chat'>
          <div className='buble-container'>
            {historyChatState.data?.data?.today.length === 0 &&
              historyChatState.data?.data?.week_before.length === 0 && (
                <p className='title'>Belum ada percakapan hari ini</p>
              )}
            {historyChatState.data?.data?.today.length !== 0 && (
              <p className='title'>Today</p>
            )}
            {historyChatState.data?.data?.today &&
              [...historyChatState.data?.data?.today]
                .reverse()
                .map((item: any, index: number) => (
                  <div key={index} className='bubble-wp'>
                    {item.message}
                  </div>
                ))}
            {historyChatState.data?.data?.week_before.length !== 0 && (
              <p className='title'>7 Hari Terakhir</p>
            )}
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
          <p className='name'>{authState.user?.name}</p>
          <Popover placement='topRight' title={""} content={LogoutButton}>
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
                      onClick={() => {
                        handleFeedback(item.chatId!, true);
                      }}
                    />
                    <DislikeOutlined
                      className={`icon-unlike ${
                        item.like === false ? "icon-unliked" : ""
                      }`}
                      onClick={() => {
                        handleFeedback(item.chatId!, false);
                      }}
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
          {/* <Space>
            <Skeleton.Avatar active={true} size={"large"} shape={"circle"} />
            <Skeleton.Input active={true} size={"default"} />
          </Space> */}
          {loadingChat && (
            <div className='buble-chat'>
              <div className='img-wp'>
                <Skeleton.Avatar active={true} size={100} shape={"circle"} />
              </div>
              <Skeleton.Input
                active={true}
                size={"default"}
                className='chat-skeleton'
              />
            </div>
          )}
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

export default ChatBotPage;
