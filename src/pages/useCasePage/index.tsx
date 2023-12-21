import {
  AudioOutlined,
  LoadingOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Input, Tooltip, message } from "antd";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { speechToText2 } from "../../api/speechtotext";
import { IUseCaseResponse, sendUsecaseResponseApi } from "../../api/useCase";
import Alert from "../../components/alert/alert";
import { logoutApp } from "../../redux/features/auth/authSlice";
import {
  getUsecaseLatestBatch,
  nextStepUseCase,
  prevStepUseCase,
  setFromDraft,
  setUseCaseAnswer,
} from "../../redux/features/usecase/useCaseSlice";
import { AppDispatch, RootState } from "../../redux/store";
import HeaderUsecase from "./component/header";
import "./styles.scss";

const { TextArea } = Input;

const useCasePage = () => {
  const navigate = useNavigate();
  const useCaseState = useSelector((state: RootState) => state.useCase);
  const dispatch = useDispatch<AppDispatch>();
  const [isRequired, setIsRequired] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const authState = useSelector((state: RootState) => state.auth);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [loadingRecord, setLoadingRecord] = useState<boolean>(false);
  const chunks = useRef<Blob[]>([]);

  const startRecording = () => {
    setRecording(true);
    setLoadingRecord(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.current.push(e.data);
          }
        };

        mediaRecorder.current.onstop = () => {
          const blob = new Blob(chunks.current, {
            type: "audio/ogg; codecs=opus",
          });
          chunks.current = [];

          // Convert blob to File
          const fileName = "audio-recording.ogg";
          const audioFile2 = new File([blob], fileName, { type: blob.type });
          setAudioFile(audioFile2);
        };

        mediaRecorder.current.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    setRecording(false);

    if (!mediaRecorder.current) return;
    mediaRecorder.current.stop();
  };

  const handleSpeechToText = async (audioFile: File) => {
    try {
      const response = await speechToText2(audioFile);
      dispatch(
        setUseCaseAnswer({
          index: useCaseState.step,
          answer: response.data.all_text,
        })
      );
      setLoadingRecord(false);
    } catch (error) {
      message.error({
        content: "Gagal mengirim jawaban",
        style: {
          marginTop: "20vh",
        },
      });
    }
  };

  useEffect(() => {
    if (audioFile) {
      handleSpeechToText(audioFile);
      setAudioFile(null);
    }
  }, [audioFile]);

  useEffect(() => {
    const accessTokenStore = localStorage.getItem("access_token");
    const userStore = localStorage.getItem("user");
    setAccessToken(accessTokenStore);
    setUser(JSON.parse(userStore || "{}"));
  }, []);

  useEffect(() => {
    const useCaseDraft = localStorage.getItem("useCaseDraft");
    if (useCaseDraft) {
      dispatch(setFromDraft(JSON.parse(useCaseDraft)));
    } else {
      if (accessToken) {
        dispatch(getUsecaseLatestBatch(accessToken));
      }
    }
  }, [dispatch, accessToken]);

  if (!authState.authenticated) {
    navigate("/usecase");
  }

  const handleSendResponse = async (batchId: string) => {
    try {
      const payload: IUseCaseResponse = {
        batch_id: batchId,
        responses: useCaseState.useCases.map((useCase) => ({
          question_id: useCase.id!,
          answer: useCase.answer!,
        })),
      };
      const response = await sendUsecaseResponseApi(accessToken || "", payload);
      if (response.status === 201) {
        message.success({
          content: "Jawaban kamu berhasil disimpan",
          style: {
            marginTop: "20vh",
          },
        });
        localStorage.removeItem("useCaseDraft");
        navigate("/success-page");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        message.error({
          content: "Session anda telah berakhir, silahkan login kembali",
          style: {
            marginTop: "20vh",
          },
        });

        dispatch(logoutApp());
        navigate("/usecase");
      }
    }
  };

  const handleNextStep = () => {
    console.log(useCaseState.useCases[useCaseState.step].required);
    console.log(useCaseState.useCases[useCaseState.step].answer);
    if (
      useCaseState.useCases[useCaseState.step].required &&
      (useCaseState.useCases[useCaseState.step].answer === "" ||
        useCaseState.useCases[useCaseState.step].answer === undefined)
    ) {
      setIsRequired(true);
      return;
    } else if (useCaseState.step + 1 === useCaseState.useCases.length) {
      // navigate("/success-page");
      handleSendResponse(useCaseState.id);
    }
    setIsRequired(false);
    dispatch(nextStepUseCase());
  };

  const handlePrevStep = () => {
    setIsRequired(false);
    dispatch(prevStepUseCase());
  };

  const getProgress = () => {
    return `${((useCaseState.step + 1) / useCaseState.useCases.length) * 100}%`;
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      setUseCaseAnswer({
        index: useCaseState.step,
        answer: e.target.value,
      })
    );
  };

  const handleSaveDraft = () => {
    localStorage.setItem(
      "useCaseDraft",
      JSON.stringify({
        id: useCaseState.id,
        useCases: useCaseState.useCases,
        step: useCaseState.step,
      })
    );
    setIsSave(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSave(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isSave]);

  return (
    <>
      <HeaderUsecase />
      <Alert
        type='success'
        title='Berhasil'
        description='Jawaban kamu berhasil disimpan sebagai Draft'
        isVisible={isSave}
      />
      {useCaseState.useCases.length > 0 && (
        <div className='question-wp'>
          <div className='save-draft-wp'>
            <Button
              className='save-draft-btn'
              icon={<SaveOutlined />}
              onClick={handleSaveDraft}
            >
              Simpan Sebagai Draft
            </Button>
          </div>
          <div className='title-wp'>
            <div className='number'>{useCaseState.step + 1}</div>
            <div className='question'>
              {useCaseState.useCases[useCaseState.step].question}{" "}
              {useCaseState.useCases[useCaseState.step].required && (
                <span style={{ color: "red" }}>*</span>
              )}
            </div>
          </div>
          <div className='steps'>
            <div className='steps-complete' style={{ width: getProgress() }} />
            <div className='text-progress'>
              {useCaseState.step + 1} dari {useCaseState.useCases.length}{" "}
              Pertanyaan
            </div>
          </div>
          <div className='text-area-wp'>
            <TextArea
              className={`textarea ${isRequired ? "warn-textarea" : ""}`}
              value={useCaseState.useCases[useCaseState.step].answer}
              onChange={handleAnswerChange}
            />
            <div className='audio-wp'>
              {/* <AudioOutlined
                className='audio'
                onClick={isRecording ? stopRecordingAndSend : startRecording}
              /> */}
              {recording ? (
                <Tooltip title='Sedang Merekam' placement='bottom'>
                  <FaSquare className='audio' onClick={stopRecording} />
                </Tooltip>
              ) : (
                <Tooltip title='Jawab Dengan Suara' placement='bottom'>
                  <AudioOutlined className='audio' onClick={startRecording} />
                </Tooltip>
              )}
            </div>
          </div>
          <div className='btn-wp'>
            <Button
              type='primary'
              className='btn-back'
              style={{
                display: useCaseState.step === 0 ? "none" : "block",
              }}
              onClick={handlePrevStep}
            >
              Kembali
            </Button>
            <Button
              type='primary'
              className='btn-submit'
              onClick={handleNextStep}
              disabled={loadingRecord}
            >
              Lanjut {loadingRecord && <LoadingOutlined />}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default useCasePage;
