import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ticker } from '../types/Ticker';

type InitialState = {
  allTickers: Ticker[];
  selectedTickers: Ticker[];
  selectedTicker: Ticker | null;
};

const initialState: InitialState = {
  allTickers: [],
  selectedTickers: [],
  selectedTicker: null,
};

let firstRender = true;

const tickersSlice = createSlice({
  name: 'userTickers',
  initialState: initialState,
  reducers: {
    setAllTickers: (state, action: PayloadAction<Ticker[]>) => {
      state.allTickers = action.payload;

      if (firstRender) {
        state.selectedTickers = action.payload;
        firstRender = false;
      }
    },
    toggleTickers: (state, action) => {
      const toggledTicker = action.payload;

      const isSelected = state.selectedTickers.some(
        ticker => ticker.ticker === toggledTicker.ticker
      );

      if (isSelected) {
        state.selectedTickers = state.selectedTickers.filter(
          ticker => ticker.ticker !== toggledTicker.ticker
        );
      } else {
        state.selectedTickers.push(toggledTicker);
      }
    },
    setSelectedTicker: (state, action) => {
      state.selectedTicker = action.payload;
    },
  },
});

export default tickersSlice.reducer;
export const { setAllTickers, toggleTickers, setSelectedTicker } =
  tickersSlice.actions;
