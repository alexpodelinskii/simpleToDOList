import { configureStore } from '@reduxjs/toolkit';
import { appReducer, appSlice } from './app-slice.ts';
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasks-slice.ts';
import { todolistSLice, todolistsReducer } from '@/features/todolists/model/todolists-slice.ts';

// объединение reducer'ов с помощью combineReducers

// создание store
export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistSLice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
  },
});

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch;

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store;
