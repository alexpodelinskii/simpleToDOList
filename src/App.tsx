import './App.css'
import TodolistItem from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

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

    const todoListsForRender = todoLists.map(tl => {
        return (<TodolistItem
            title={tl.title}
            tasks={getTasksForRender(tasks[tl.id], tl.filter)}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
            todoListId={tl.id}
            deleteTaskList={deleteTaskList}
            key={tl.id}
        />)
    })
    return (
        <div className="app">
            {todoListsForRender}
        </div>
    )
}

export default App
