import './App.css'
import TodolistItem from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'complete';

function App() {

    const title: string = 'What to learn';

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'LS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    const deleteTask = (taskId: TaskType['id']) => {
        const newTask =
            tasks.filter(
                (el) => el.id !== taskId
            );
        setTasks((newTask))
    }

    const [filter, setFiler] = useState<FilterValuesType>('all')

    const getTasksForRender = (tasks: TaskType[], filter: FilterValuesType) => {

        if (filter === "active") {
            return tasks.filter(task => !task.isDone);
        }
        if (filter === "complete") {
            return tasks.filter(task => task.isDone);
        }
        return tasks

    }

    const changeFilter = (status: FilterValuesType) => {
        setFiler((status))
    }

    const tasksForRender = getTasksForRender(tasks, filter)

    const addTask = (newTask: TaskType) => {
        setTasks([newTask, ...tasks,])
    }
    const changeTaskStatus = (taskId: TaskType['id'], newStatus: TaskType['isDone'])=>{
        const newTasks = tasks.map((t=>{
            if(t.id===taskId){
                t.isDone=newStatus
            }
            return t;
        }))
        setTasks(newTasks);
    }
    return (
        <div className="app">
            <TodolistItem
                title={title}
                tasks={tasksForRender}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter ={filter}
            />
        </div>
    )
}

export default App
