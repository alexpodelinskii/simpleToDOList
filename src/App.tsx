import './App.css'
import TodolistItem from "./todolistItem/TodolistItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import CreateItemForm from "./createItemForm/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu'
import {Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider} from "@mui/material";
import {containerSx} from "./todolistItem/TodoListItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todoListsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

type ThemeMode = 'dark' | 'light'


const todoListId_1 = v1();
const todoListId_2 = v1();


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TasksState = {
    [key: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'complete';

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme(({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    }))
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    // const [todoLists, setTodoLists] = useState<TodoListType[]>([
    //     {id: todoListId_1, title: 'What to learn', filter: "all"},
    //     {id: todoListId_2, title: 'What to buy', filter: "all"}
    // ])
    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: "all"},
        {id: todoListId_2, title: 'What to buy', filter: "all"}
    ])

    // const [tasks, setTasks] = useState<TasksState>({
    //     [todoListId_1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'LS', isDone: true},
    //         {id: v1(), title: 'React', isDone: false},
    //     ],
    //     [todoListId_2]: [
    //         {id: v1(), title: 'Milk', isDone: true},
    //         {id: v1(), title: 'Potato', isDone: true},
    //         {id: v1(), title: 'Beer', isDone: false},
    //         {id: v1(), title: 'Chaps', isDone: false},
    //     ]
    // })


    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'LS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Potato', isDone: true},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Chaps', isDone: false},
        ]
    })


    const deleteTask = (taskId: TaskType['id'], todolistId: TodoListType["id"]) => {
        dispatchToTasks(deleteTaskAC({todolistId, taskId}))
    }
    const changeTaskTitle = (payload: {
        taskId: TaskType['id'],
        todoListId: TodoListType["id"],
        title: TodoListType["title"]
    }) => {
        const {taskId, todoListId, title} = payload;

        dispatchToTasks(changeTaskTitleAC({taskId, todoListId, title}))
    }

    const addTask = (title: TaskType["title"], todolistId: TodoListType["id"]) => {
        dispatchToTasks(createTaskAC({title, todolistId}))
    }

    const getTasksForRender = (tasks: TaskType[], filter: FilterValuesType) => {

        if (filter === "active") {
            return tasks.filter(task => !task.isDone);
        }
        if (filter === "complete") {
            return tasks.filter(task => task.isDone);
        }
        return tasks

    }


    const changeTaskStatus = (taskId: TaskType['id'], isDone: TaskType['isDone'], todolistId: TodoListType["id"]) => {
        dispatchToTasks(changeTaskStatusAC({taskId,todolistId,isDone}))
    }


    const deleteTodoList = (todoListId: TodoListType["id"]) => {
        const action = deleteTodolistAC(todoListId);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }
    const changeTodolistFilter = (filter: FilterValuesType, id: TodoListType["id"]) => {
        dispatchToTodoLists(changeTodolistFilterAC({id, filter}))
    }
    const createTodoList = (title: TodoListType["title"]) => {
        const action = createTodolistAC({title, id: v1()});
        dispatchToTodoLists(action)
        dispatchToTasks(action);
    }
    const changeTodoListTitle = (payload: { title: TodoListType["title"], id: TodoListType['id'] }) => {
        dispatchToTodoLists(changeTodolistTitleAC(payload))
    }


    function isTaskParamsOk(value: string) {
        const trimmedValueLength = value.trim().length;
        return trimmedValueLength >= 3 && trimmedValueLength < 10;
    }


    const todoListsForRender = todoLists.map(tl => {
        return (
            <Grid key={tl.id}>
                <Paper sx={{'mb': '30px'}}>
                    <TodolistItem
                        title={tl.title}
                        tasks={getTasksForRender(tasks[tl.id], tl.filter)}
                        deleteTask={deleteTask}
                        changeFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        todoListId={tl.id}
                        deleteTaskList={deleteTodoList}
                        key={tl.id}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>

            </Grid>
        )
    })
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <AppBar position={'static'} sx={{'mb': '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color={'inherit'}>
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeModeHandler}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{'mb': '30px'}}>
                        <CreateItemForm addItem={createTodoList} isOkValue={isTaskParamsOk}
                                        errorText={'todolist title must be more then 2 and less then 10 chars'}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoListsForRender}
                    </Grid>
                </Container>


            </div>
        </ThemeProvider>
    )
}

export default App
