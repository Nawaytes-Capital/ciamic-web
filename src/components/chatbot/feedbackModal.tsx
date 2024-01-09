import { Button, Typography, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal/Modal";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { sendChatFeedbackApi } from "../../api/chatbot";
import { logoutApp } from "../../redux/features/auth/authSlice";
import { updateLike } from "../../redux/features/chatbot/chat/chatSlice";
import { useState } from "react";
import { AxiosError } from "axios";
const { Text } = Typography;

interface Props {
  chatId: string;
  like: boolean | null;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export default function FeedbackModal(props: Props) {
  const handleCancel = () => {
    props.setIsModalOpen(false);
    setNotes("");
    handleFeedback(props.chatId, props.like!);
  };
  const dispatch = useDispatch<AppDispatch>();
  const [notes, setNotes] = useState("");
  const authState = useSelector((state: RootState) => state.auth);
  const handleFeedback = async (chatId: string, like: boolean) => {
    try {
      setNotes("");
      await sendChatFeedbackApi(
        authState.accessToken || "",
        chatId,
        like,
        notes
      );
      dispatch(
        updateLike({
          chatId,
          like,
        })
      );
      message.success({
        content: `Terima kasih atas feedback anda`,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logoutApp());
        } else {
          message.error({
            content: `${error.response?.data.message}`,
          });
          return;
        }
      }
      message.error({
        content: `Terjadi kesalahan pada server`,
      });
    }
  };

  const handleOk = () => {
    handleFeedback(props.chatId, props.like!);
    props.setIsModalOpen(false);
  };
  return (
    <Modal
      title='Feedback'
      open={props.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key='submit'
          type='primary'
          onClick={handleOk}
          className='submit-button'
        >
          Kirim
        </Button>,
      ]}
    >
      {props.like ? (
        <>
          <p>Terima kasih sudah menyukai Fitur Ciamic! </p>
        </>
      ) : (
        <p> Silahkan beri masukan agar kami bisa jauh lebih baik</p>
      )}

      <TextArea
        className='text-input'
        placeholder='Berikan Feedback (Optional)'
        rows={4}
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
      ></TextArea>
    </Modal>
  );
}
