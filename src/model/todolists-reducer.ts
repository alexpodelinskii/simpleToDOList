import {TodoListType} from "../app/App.tsx";
import {createAction, createReducer} from "@reduxjs/toolkit";
import {v1} from "uuid";

export const deleteTodolistAC = createAction<{ id: TodoListType["id"] }>('todolist/deleteTodolist')
export const changeTodolistTitleAC = createAction<{
    id: TodoListType["id"],
    title: TodoListType["title"]
}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{
    id: TodoListType["id"],
    filter: TodoListType["filter"]
}>('todolists/changeTodolistFilter')
export const createTodolistAC = createAction('todolists/createTodolist', (title: TodoListType["title"]) => {
    return {
        payload: {
            title,
            id: v1()
        }
    }
})

const initialState: TodoListType[] = [];

export const todoListsReducer = createReducer(initialState, (builder) => {
        builder
            .addCase(deleteTodolistAC, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(changeTodolistTitleAC, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                if (index !== -1) state[index].title = action.payload.title
            })
            .addCase(changeTodolistFilterAC, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                if (index !== -1) state[index].filter = action.payload.filter
            })
            .addCase(createTodolistAC, (state, action) => {
                const newTodoList: TodoListType = {
                    id: action.payload.id,
                    title: action.payload.title,
                    filter: 'all'
                }
                state.push(newTodoList)
            })
    }
)
