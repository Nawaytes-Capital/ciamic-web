import { AudioOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsecaseLatestBatch,
  nextStepUseCase,
  prevStepUseCase,
  setFromDraft,
  setUseCaseAnswer,
} from "../../redux/features/usecase/useCaseSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Alert from "../../components/alert/alert";
import HeaderUsecase from "./component/header";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const useCasePage = () => {
  const navigate = useNavigate();
  const useCaseState = useSelector((state: RootState) => state.useCase);
  const dispatch = useDispatch<AppDispatch>();
  const [isRequired, setIsRequired] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

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

  const handleNextStep = () => {
    if (
      useCaseState.useCases[useCaseState.step].required &&
      useCaseState.useCases[useCaseState.step].answer === ""
    ) {
      setIsRequired(true);
      return;
    } else if (useCaseState.step + 1 === useCaseState.useCases.length) {
      navigate("/success-page");
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
              <AudioOutlined className='audio' />
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
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default useCasePage;
