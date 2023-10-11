import { Button } from "antd";
import {
  ChangeEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
import HeaderUsecase from "./component/header";
import "./styles.scss";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  nextStepUseCase,
  prevStepUseCase,
  setUseCaseAnswer,
} from "../../redux/features/usecase/useCaseSlice";
import { SaveOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const useCasePage = () => {
  const useCaseState = useSelector((state: RootState) => state.useCase);
  const dispatch = useDispatch<AppDispatch>();

  const handleNextStep = () => {
    dispatch(nextStepUseCase());
  };

  const handlePrevStep = () => {
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
    localStorage.setItem("useCaseDraft", JSON.stringify(useCaseState.useCases));
  };

  return (
    <>
      <HeaderUsecase />
      <div className='question-wp'>
        <div className='save-draft-wp'>
          <Button className='save-draft-btn' icon={<SaveOutlined /> } onClick={handleSaveDraft}> 
            Simpan Sebagai Draft
          </Button>
        </div>
        <div className='title-wp'>
          <div className='number'>{useCaseState.step + 1}</div>
          <div className='question'>
            {useCaseState.useCases[useCaseState.step].question}
          </div>
        </div>
        <div className='steps'>
          <div className='steps-complete' style={{ width: getProgress() }} />
          <div className='text-progress'>1 dari 10 Pertanyaan</div>
        </div>
        <TextArea
          className='textarea'
          value={useCaseState.useCases[useCaseState.step].answer}
          onChange={handleAnswerChange}
        />
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
    </>
  );
};

export default useCasePage;