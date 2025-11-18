import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@/common/types';

const initialState = {
  themeMode: 'light' as ThemeMode,
  status: 'idle' as RequestStatus,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: (create) => {
    return {
      changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode;
      }),
      changeStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
        state.status = action.payload.status;
      }),
    };
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
  },
});

export const appReducer = appSlice.reducer;
export const { changeThemeModeAC, changeStatusAC } = appSlice.actions;
export const { selectThemeMode, selectStatus } = appSlice.selectors;

export type ThemeMode = 'dark' | 'light';
