import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUseCaseLatestBatchApi } from "../../../api/useCase";

export const getUsecaseLatestBatch = createAsyncThunk(
  "usecase/getUsecaseLatestBatch",
  async (token: string) => {
    const response = await getUseCaseLatestBatchApi(token);
    return response.data;
  }
);

interface IUsecCaseState {
  question: string;
  answer?: string;
  required: boolean;
  id: number;
}

interface IInitialUseCaseState {
  id: string;
  useCases: IUsecCaseState[];
  status: "idle" | "loading" | "failed";
  step: number;
}

const initialState: IInitialUseCaseState = {
  id: "",
  step: 0,
  status: "idle",
  useCases: [],
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
  extraReducers: (builder) => {
    builder
      .addCase(getUsecaseLatestBatch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsecaseLatestBatch.fulfilled, (state, action) => {
        state.status = "idle";
        state.id = action.payload?.data?._id;
        state.useCases = action.payload?.data?.question;
        state.step = 0;
      })
      .addCase(getUsecaseLatestBatch.rejected, (state) => {
        state.status = "failed";
      });
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
