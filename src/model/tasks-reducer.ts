import {TasksState, TaskType, TodoListType} from "../app/App.tsx";

import {v1} from "uuid";
import {createAction, createReducer} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";


export const deleteTaskAC = createAction<{
    todolistId: TodoListType["id"],
    taskId: TaskType["id"]
}>('tasks/ deleteTask')
export const createTaskAC = createAction<{
    todolistId: TodoListType["id"],
    title: TaskType["title"],
}>('tasks/createTask')
export const changeTaskStatusAC = createAction<{
    todolistId: TodoListType["id"],
    taskId: TaskType["id"],
    isDone: TaskType["isDone"]
}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{
    taskId: TaskType['id'],
    todolistId: TodoListType["id"],
    title: TodoListType["title"]
}>('tasks/changeTaskTitle')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId].splice(index, 1)
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            state[action.payload.todolistId].push(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId][index].isDone = action.payload.isDone
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId][index].title = action.payload.title
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
})
