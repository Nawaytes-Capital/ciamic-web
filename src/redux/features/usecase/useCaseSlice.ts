import { createSlice } from "@reduxjs/toolkit";

interface IUsecCaseState {
  question: string;
  answer?: string;
  isMandatory: boolean;
}

interface IInitialUseCaseState {
  id: string;
  useCases: IUsecCaseState[];
  step: number;
}

const initialState: IInitialUseCaseState = {
  id: "usecase-01",
  step: 0,
  useCases: [
    {
      question:
        "Kita mulai aja yuk, nama perusahaannya/brand-nya client kamu itu apa sih?",
      answer: "",
      isMandatory: false,
    },
    {
      question: "Siapa Kompetitor Untuk Layanan Astinet?",
      answer: "",
      isMandatory: true,
    },
    {
      question:
        "Apa layanan utama yang ditawarkan oleh perusahaan telekomunikasi ini kepada pelanggan?",
      answer: "",
      isMandatory: true,
    },
    {
      question:
        "Bagaimana perusahaan ini berinvestasi dalam teknologi terbaru untuk meningkatkan jaringan dan layanan mereka?",
      answer: "",
      isMandatory: true,
    },
    {
      question:
        "Apa cakupan jaringan perusahaan ini, baik secara regional maupun global?",
      answer: "",
      isMandatory: false,
    },
    {
      question:
        "Bagaimana perusahaan menghadapi persaingan di pasar telekomunikasi dan strategi apa yang mereka gunakan untuk mempertahankan atau meningkatkan pangsa pasar?",
      answer: "",
      isMandatory: false,
    },
    {
      question:
        "Apa peran perusahaan dalam mengembangkan infrastruktur telekomunikasi di negara atau wilayah tertentu?",
      answer: "",
      isMandatory: false,
    },
  ],
};

const useCaseSlice = createSlice({
  name: "usecase",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setUseCaseAnswer: (state, action) => {
      state.useCases[action.payload.index].answer = action.payload.answer;
    },
    nextStepUseCase: (state) => {
      if (state.step < state.useCases.length - 1) {
        state.step += 1;
      }
    },
    prevStepUseCase: (state) => {
      if (state.step > 0) {
        state.step -= 1;
      }
    },
    setFromDraft(state, action) {
      state.id = action.payload.id;
      state.useCases = action.payload.useCases;
      state.step = action.payload.step;
    },
  },
});

export default useCaseSlice.reducer;

export const {
  setStep,
  setUseCaseAnswer,
  nextStepUseCase,
  prevStepUseCase,
  setFromDraft,
} = useCaseSlice.actions;
