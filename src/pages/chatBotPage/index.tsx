/* eslint-disable jsx-a11y/alt-text */
import {
  CloseSquareOutlined,
  CopyOutlined,
  DislikeOutlined,
  InfoCircleOutlined,
  LikeOutlined,
  MenuOutlined,
  MoreOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import MarkdownPreview, {
  MarkdownPreviewRef,
} from "@uiw/react-markdown-preview";
import { Button, Col, Input, Popover, Row, Skeleton, message } from "antd";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import {
  generateChatRoomApi,
  getHistoryChatByIdApi,
  getRelatedQuestionApi,
  sendChatApi,
} from "../../api/chatbot";
import logo from "../../assets/images/logo-ciamic.png";
import FeedbackModal from "../../components/chatbot/feedbackModal";
import { logoutApp } from "../../redux/features/auth/authSlice";
import {
  addChat,
  resetChat,
} from "../../redux/features/chatbot/chat/chatSlice";
import {
  changeChatRoom,
  generateChatRoom,
} from "../../redux/features/chatbot/chatRoom/chatRoomSlice";
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
  const [lastSentQuestion, setLastSentQuestion] = useState<string>("");
  const [isFullmenu, setFullmenu] = useState<boolean>(false);

  const [loadingChat, setLoadingChat] = useState(false);
  const [chatbotError, setChatbotError] = useState(false);
  const authState = useSelector((state: RootState) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeFeedback, setLikeFeedback] = useState<boolean | null>(null);
  const [chatId, setChatId] = useState<string>("");

  const [relatedQuestion, setRelatedQuestion] = useState<string[]>([]);

  const handleGetRelatedQuestion = async () => {
    try {
      const response = await getRelatedQuestionApi();
      //trim 3 huruf pertama
      const data = response.data.data.map((item) =>
        item.substring(3, item.length)
      );
      data.length = 4;
      setRelatedQuestion(data);
    } catch (error) {
      setRelatedQuestion([]);
    }
  };

  const markdownRef = useRef<MarkdownPreviewRef>(null);

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
    handleGetRelatedQuestion();
  }, [dispatch, authState]);

  // const recomendQuestion = [
  //   {
  //     id: 1,
  //     question: "Bagaimana cara mendaftarkan akun email di Telkom ?",
  //   },
  //   {
  //     id: 2,
  //     question: "Apa Itu Big Box ?",
  //   },
  //   {
  //     id: 3,
  //     question: "Keunggulan Produk Produk Telkom",
  //   },
  //   {
  //     id: 4,
  //     question: "Tutorial Mendaftar Akun Chatbot",
  //   },
  // ];
  const sendChat = async () => {
    try {
      setLoadingChat(true);
      setChatbotError(false);
      dispatch(
        addChat({
          id: chatState.chats.length,
          message: question,
          type: "user",
        })
      );
      setLastSentQuestion(question);
      const chatResponse = await sendChatApi(authState.accessToken || "", {
        chat: question,
        room_id: chatRoomState.roomId!,
      });
      setLoadingChat(false);
      dispatch(getHistoryChat(authState.accessToken || ""));
      dispatch(
        addChat({
          id: chatState.chats.length + 1,
          message: chatResponse?.data?.data?.message,
          type: "bot",
          like: null,
          chatId: chatResponse?.data?.data?._id,
        })
      );
      handleGetRelatedQuestion();
    } catch (error) {
      setLoadingChat(false);
      setQuestion("");
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          message.error({
            content: `Sesi anda telah berakhir, silahkan login kembali`,
          });
          dispatch(logoutApp());
          navigate("/");
        } else {
          setChatbotError(true);
          message.error({
            content: `${error.response?.data?.message}`,
          });
          return;
        }
      }
      message.error({
        content: `Terjadi kesalahan, silahkan coba lagi`,
      });
    }
    setQuestion("");
  };

  const handleRetry = async () => {
    try {
      setChatbotError(false);
      setLoadingChat(true);
      const response = await sendChatApi(authState.accessToken || "", {
        chat: lastSentQuestion,
        room_id: chatRoomState.roomId!,
      });

      dispatch(
        addChat({
          id: chatState.chats.length + 1,
          message: response?.data?.data?.message,
          type: "bot",
          like: null,
          chatId: response?.data?.data?._id,
        })
      );
      handleGetRelatedQuestion();
      setLoadingChat(false);
    } catch (error) {
      setLoadingChat(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          message.error({
            content: `Sesi anda telah berakhir, silahkan login kembali`,
          });
          dispatch(logoutApp());
          navigate("/");
        } else {
          setChatbotError(true);
          message.error({
            content: `${error.response?.data?.message}`,
          });
          return;
        }
      }
      setChatbotError(true);
      message.error({
        content: `Terjadi kesalahan, silahkan coba lagi`,
      });
    }
  };

  if (historyChatState.error) {
    message.error({
      content: `Sesi anda telah berakhir, silahkan login kembali`,
    });
    dispatch(logoutApp());
    dispatch(resetHistoryChat());
    navigate("/");
  }

  if (!authState.authenticated) {
    return <></>;
  }

  const handleNewChatRoom = async () => {
    try {
      const response = await generateChatRoomApi(authState.accessToken || "");
      dispatch(resetChat());
      dispatch(changeChatRoom(response?.data?.data?.id));
      setChatbotError(false);
    } catch (error) {
      message.error({
        content: `Sesi anda telah berakhir, silahkan login kembali`,
      });
      dispatch(logoutApp());
    }
  };

  const isActive = (chatRoomId: string) => {
    if (chatRoomState.roomId === chatRoomId) {
      return "history-active";
    }
    return "";
  };

  const handleSelectChatRoom = async (chatRoomId: string) => {
    try {
      setChatbotError(false);
      const response = await getHistoryChatByIdApi(
        authState.accessToken || "",
        chatRoomId
      );
      dispatch(resetChat());
      dispatch(changeChatRoom(chatRoomId));
      response.data.data.forEach((item, index) => {
        dispatch(
          addChat({
            id: index + 1,
            message: item.message!,
            type: item.from === "bot" ? "bot" : "user",
            like: item.like,
            chatId: item._id,
          })
        );
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          message.error({
            content: `Sesi anda telah berakhir, silahkan login kembali`,
          });
          dispatch(logoutApp());
        } else {
          message.error({
            content: `${error.response?.data?.message}`,
          });
        }
      }
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
            <p className='title'>Riwayat Chat</p>
            {historyChatState.data?.data?.today.length === 0 &&
              historyChatState.data?.data?.week_before.length === 0 && (
                <p className='title'>Belum ada percakapan hari ini</p>
              )}
            {historyChatState.data?.data?.today.length !== 0 && (
              <p className='title'>Hari Ini</p>
            )}
            {historyChatState.data?.data?.today &&
              [...historyChatState.data?.data?.today]
                .reverse()
                .map((item: any, index: number) => (
                  <div
                    key={item.room_id}
                    className={`bubble-wp ${isActive(item.room_id)}`}
                    onClick={() => handleSelectChatRoom(item.room_id)}
                  >
                    {item.first_chat}
                  </div>
                ))}
            {historyChatState.data?.data?.week_before.length !== 0 && (
              <p className='title'>7 Hari Terakhir</p>
            )}
            {historyChatState.data?.data?.week_before &&
              [...historyChatState.data?.data?.week_before]
                .reverse()
                .map((item: any) => {
                  return (
                    <div
                      key={item.room_id}
                      className={`bubble-wp ${isActive(item.room_id)}`}
                      onClick={() => handleSelectChatRoom(item.room_id)}
                    >
                      {item.first_chat}
                    </div>
                  );
                })}
          </div>
        </div>
        <div className='account-wp'>
          <div className='img-wp'>
            <img src={"user-profile.png"} />
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
              <>
                <div className='buble-chat'>
                  <div
                    className={`img-wp ${
                      item.type === "user" ? "bg-cust" : ""
                    }`}
                  >
                    {item.type === "user" ? (
                      <img className='img-cust' src={"user-chatbot.png"} />
                    ) : (
                      <img className='img-admin' src={logo} />
                    )}
                  </div>
                  <div
                    className={`chat ${
                      item.type === "user" ? "chat-cust" : "chat-admin"
                    }`}
                  >
                    <MarkdownPreview
                      ref={markdownRef}
                      className={`${
                        item.type === "user"
                          ? "markdown-cust"
                          : "markdown-admin"
                      }`}
                      remarkPlugins={[remarkGfm]}
                      linkTarget={"_blank"}
                      source={item.message}
                    />
                  </div>

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
                          if (item.like !== true) {
                            setChatId(item.chatId!);
                            setIsModalOpen(true);
                            setLikeFeedback(true);
                          }
                        }}
                      />
                      <DislikeOutlined
                        className={`icon-unlike ${
                          item.like === false ? "icon-unliked" : ""
                        }`}
                        onClick={() => {
                          if (item.like !== false) {
                            setChatId(item.chatId!);
                            setIsModalOpen(true);
                            setLikeFeedback(false);
                          }
                        }}
                      />
                    </div>
                  )}
                  {/* {item.type === "bot" &&
                  item.id !== 0 &&
                  item.id === chatState.chats.length - 1 && (
                    <div className='suggestion-wp'>
                      <div className='chat-wp'>
                        Bisakah Anda merekomendasikan fitur tambahan BigBox yang
                        dapat meningkatkan keamanan data perusahaan kami?
                      </div>
                      <div className='chat-wp'>
                        Bagaimana cara menggunakan fitur BigIntegration untuk
                        mengintegrasikan BigBox dengan sistem atau aplikasi yang
                        sudah ada di perusahaan kami?
                      </div>
                    </div>
                  )} */}
                </div>
                {item.type === "bot" &&
                  item.id !== 0 &&
                  item.id === chatState.chats.length - 1 && (
                    <div className='buble-chat'>
                      <div className='suggestion-wp'>
                        {relatedQuestion.length !== 0 &&
                          relatedQuestion.map((item) => {
                            return (
                              <div
                                className='chat-wp'
                                onClick={() => setQuestion(item)}
                              >
                                {item}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
              </>
            );
          })}

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
          {chatbotError && (
            <div className='buble-chat'>
              <div className='error-wp'>
                <InfoCircleOutlined
                  style={{
                    color: "#B90000",
                    padding: "0px 10px",
                  }}
                />
                <p className='error-text'>
                  Maaf, Sistem kami sedang sibuk. Silahkan Kirim Ulang
                  pertanyaan atau ketik pertanyaan baru.
                </p>{" "}
                <Button className='btn-try-again'>
                  <TbRefresh onClick={handleRetry} />
                  Kirim Ulang
                </Button>
              </div>
            </div>
          )}
        </div>
        ;
        {chatState.chats.length === 1 && (
          <div className='recomend-question'>
            <p>Pertanyaan yang sering ditanyakan</p>
            <div className='recomend-wp'>
              <Row gutter={16} style={{ width: "100%" }}>
                {relatedQuestion.map((item) => {
                  return (
                    <Col className='gutter-row' span={12}>
                      <div
                        className='recomend-box'
                        onClick={() => setQuestion(item)}
                      >
                        {item}
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
      <FeedbackModal
        chatId={chatId}
        like={likeFeedback}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default ChatBotPage;
