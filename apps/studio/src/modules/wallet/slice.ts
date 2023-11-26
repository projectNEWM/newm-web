import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WalletState } from './types';

const initialState: WalletState = {
  walletAddress: undefined,
  walletBalance: undefined,
};

const walletSlice = createSlice({
  initialState,
  name: 'wallet',
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    setWalletBalance: (state, action: PayloadAction<string>) => {
      state.walletBalance = action.payload;
    },
  },
});

export const { setWalletBalance, setWalletAddress } = walletSlice.actions;

export default walletSlice.reducer;
