import {TodoListType} from "../App.tsx";


export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>

export const deleteTodolistAC = (id: TodoListType["id"]) => ({
    type: 'delete_todolist',
    payload: {
        id
    }
} as const);

export type CreateTodolistAT = ReturnType<typeof createTodolistAC>
export const createTodolistAC = (payload:{title: TodoListType["title"], id:TodoListType["id"]}) => ({
    type: 'create_todolist',
    payload: payload,

} as const);

export type  ChangeTodoListTitleAT = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (payload: { id: TodoListType["id"], title: TodoListType["title"] }) => ({
    type: 'change_todolist_title',
    payload: payload
} as const)

type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (payload: { id: TodoListType["id"], filter: TodoListType["filter"] }) => ({
    type: 'change_todolist_filter',
    payload: payload
} as const)


type ActionType = DeleteTodolistAT | CreateTodolistAT | ChangeTodoListTitleAT | ChangeTodolistFilterAT

export const todoListsReducer = (todoLists: TodoListType[], action: ActionType): TodoListType[] => {

    switch (action.type) {
        case "delete_todolist":
            return todoLists.filter(tl => tl.id !== action.payload.id);
        case "create_todolist":
            const newTodoList: TodoListType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all'
            }
            return [...todoLists, newTodoList];
        case "change_todolist_title":
            return todoLists.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : {...tl})
        case 'change_todolist_filter':
            return todoLists.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl);
        default:
            return todoLists;
    }


}
