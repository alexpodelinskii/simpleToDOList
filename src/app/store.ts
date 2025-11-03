import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {appReducer} from "@/app/app-reducer.ts";
import {tasksReducer} from "@/features/todolists/model/tasks-reducer.ts";
import {todoListsReducer} from "@/features/todolists/model/todolists-reducer.ts";



// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
    app:appReducer,
    tasks: tasksReducer,
    todolists: todoListsReducer,
})

// создание store
export const store = configureStore({
    reducer: rootReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store