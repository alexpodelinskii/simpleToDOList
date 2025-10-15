import './App.css'
import TodolistItem from "./todolistItem/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import CreateItemForm from "./createItemForm/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu'
import {Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider} from "@mui/material";
import {containerSx} from "./todolistItem/TodoListItem.styles.ts";
import {NavButton} from "./NavButton.ts";

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

export type TodoListTypes = {
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
    const changeModehandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const [todoLists, setTodoLists] = useState<TodoListTypes[]>([
        {id: todoListId_1, title: 'What to learn', filter: "all"},
        {id: todoListId_2, title: 'What to buy', filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksState>({
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

    const deleteTask = (taskId: TaskType['id'], todoListId: TodoListTypes["id"]) => {
        const newTasks = {
            ...tasks,
            [todoListId]: tasks[todoListId].filter(
                (t) => t.id !== taskId)
        }
        setTasks(newTasks)
    }
    const changeTaskTitle = (payload: {
        taskId: TaskType['id'],
        todoListId: TodoListTypes["id"],
        title: TodoListTypes["title"]
    }) => {
        const {taskId, todoListId, title} = payload;

        const newTasks = {
            ...tasks,
            [todoListId]: tasks[todoListId].map(
                (t) => t.id === taskId ? {...t, title} : {...t})
        }
        setTasks(newTasks)
    }

    const addTask = (newTask: TaskType, todoListId: TodoListTypes["id"]) => {
        setTasks({
            ...tasks,
            [todoListId]: [...tasks[todoListId], newTask]
        })
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

    const changeFilter = (status: FilterValuesType, todoListId: TodoListTypes["id"]) => {
        const newTodoLists = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: status} : tl);
        setTodoLists((newTodoLists));
    }

    const changeTaskStatus = (taskId: TaskType['id'], newStatus: TaskType['isDone'], todoListId: TodoListTypes["id"]) => {
        const newTasks = {
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => {
                if (t.id === taskId) {
                    t.isDone = newStatus
                }
                return t;
            })
        }

        setTasks(newTasks);
    }
    const deleteTaskList = (todoListId: TodoListTypes["id"]) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const newTasks = {...tasks}
        delete tasks[todoListId]
        setTasks(newTasks)
    }


    const addTodoList = (title: string) => {
        const newTodoList: TodoListTypes = {
            id: v1(),
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList]);
        setTasks({...tasks, [newTodoList.id]: []})
    }
    const changeTodoListTitle = (payload: { title: string, id: TodoListTypes['id'] }) => {
        const {title, id} = payload;
        setTodoLists(todoLists.map(tl => tl.id === id ? {...tl, title} : {...tl}));

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
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        todoListId={tl.id}
                        deleteTaskList={deleteTaskList}
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
                                <Switch color={'default'} onChange={changeModehandler}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{'mb': '30px'}}>
                        <CreateItemForm addItem={addTodoList} isOkValue={isTaskParamsOk}
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
