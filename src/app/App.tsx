import './App.css'
import TodolistItem from "../todolistItem/TodolistItem.tsx";
import {useState} from "react";
import CreateItemForm from "../createItemForm/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu'
import {Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider} from "@mui/material";
import {containerSx} from "../todolistItem/TodoListItem.styles.ts";
import {NavButton} from "../NavButton.ts";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
} from "../model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC,} from "../model/tasks-reducer.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";

type ThemeMode = 'dark' | 'light'


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TasksState = {//Record<string, TaskType[]>
    [key: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'complete';

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


function App() {

    const todoLists = useAppSelector(selectTodolists);
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

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


    const deleteTask = (taskId: TaskType['id'], todolistId: TodoListType["id"]) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }
    const changeTaskTitle = (payload: {
        taskId: TaskType['id'],
        todolistId: TodoListType["id"],
        title: TodoListType["title"]
    }) => {
        const {taskId, todolistId, title} = payload;

        dispatch(changeTaskTitleAC({taskId, todolistId, title}))
    }

    const addTask = (title: TaskType["title"], todolistId: TodoListType["id"]) => {
        dispatch(createTaskAC({title, todolistId}))
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
        dispatch(changeTaskStatusAC({taskId, todolistId, isDone}))
    }


    const deleteTodoList = (todoListId: TodoListType["id"]) => {
        dispatch(deleteTodolistAC({id:todoListId}));
    }
    const changeTodolistFilter = (filter: FilterValuesType, id: TodoListType["id"]) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }
    const createTodoList = (title: TodoListType["title"]) => {
        dispatch(createTodolistAC(title))

    }
    const changeTodoListTitle = (payload: { title: TodoListType["title"], id: TodoListType['id'] }) => {
        dispatch(changeTodolistTitleAC(payload))
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
                        todolistId={tl.id}
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
