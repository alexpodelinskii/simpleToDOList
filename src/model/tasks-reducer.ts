import {TasksState, TaskType, TodoListType} from "../App.tsx";
import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";
import {v1} from "uuid";


type ActionType = CreateTodolistAT | DeleteTodolistAT | DeleteTaskAT | CreateTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT

type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
type CreateTaskAT = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export const deleteTaskAC = (payload: { todolistId: TodoListType["id"], taskId: TaskType["id"] }) => ({
    type: 'delete-task',
    payload: payload
} as const)

export const createTaskAC = (payload: {
    todolistId: TodoListType["id"],
    title: TaskType["title"],
}) => ({
    type: 'create-task',
    payload: payload
} as const)

export const changeTaskStatusAC =
    (payload: { todolistId: TodoListType["id"], taskId: TaskType["id"], isDone: TaskType["isDone"] }) => ({
        type: 'change-task-status',
        payload: payload
    } as const)

export const changeTaskTitleAC = (payload:{  taskId: TaskType['id'],
    todoListId: TodoListType["id"],
    title: TodoListType["title"]})=>({
    type: 'change-task-title',
    payload:payload

} as const)

export const tasksReducer = (tasks: TasksState, action: ActionType): TasksState => {
    switch (action.type) {
        case "create_todolist":
            return {...tasks, [action.payload.id]: []};
        case "delete_todolist":
            const newTasks = {...tasks};
            delete newTasks[action.payload.id];
            return newTasks;
        case "delete-task":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].filter(
                    (t) => t.id !== action.payload.taskId)
            };

        case "create-task":
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {
                ...tasks,
                [action.payload.todolistId]: [newTask, ...tasks[action.payload.todolistId],]
            };
        case "change-task-status":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => {
                    if (t.id === action.payload.taskId) {
                        t.isDone = action.payload.isDone
                    }
                    return t;
                })
            }
        case "change-task-title":
            return {
                ...tasks,
                [action.payload.todoListId]: tasks[action.payload.todoListId].map(
                    (t) => t.id === action.payload.taskId ? {...t, title:action.payload.title} : {...t})
            }
        default:
            return tasks
    }
}