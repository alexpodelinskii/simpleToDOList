import {FilterValuesType, TaskType} from "./App.tsx";
import Button from "./Buttons.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {v1} from "uuid";


type PropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType['id']) => void
    changeFilter: (status: FilterValuesType) => void
    addTask: (newTask: TaskType) => void
    changeTaskStatus: (taskId: TaskType['id'], newTaskStatus: TaskType['isDone']) => void
}


const TodolistItem = (
    {
        title,
        tasks,
        deleteTask,
        changeFilter,
        addTask,
        changeTaskStatus
    }: PropsType) => {

    const taskList = tasks.length === 0
        ? <span>Your tasklist is empty</span>
        : <ul>

            {

                tasks.map((task, ind) => {
                    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked)
                    return (

                        <li key={ind} className={task.isDone?'task-done':'task'}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeTaskStatusHandler}
                            />
                            <span>{task.title}
                                <Button
                                    title={'X'}
                                    onClick={() => {
                                        deleteTask(task.id)
                                    }}
                                />
                        </span>
                        </li>
                    )
                })}
        </ul>

    const [newTaskTitle, setNewTaskTitle] = useState('')

    function inputOnChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(event.currentTarget.value)
    }

    function addTaskHandler() {
        const title = newTaskTitle.trim()
        if (title.length > 3 && title.length <= 10) {
            const newTask: TaskType = {
                id: v1(),
                title: title,
                isDone: false
            }
            setNewTaskTitle('');
            addTask(newTask);
        } else {
            setNewTaskTitle(title)
        }
    }

    function addTaskOnEnterHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter' && newTaskTitle.length >= 3 && newTaskTitle.trim().length <= 10) {
            addTaskHandler()
        }
    }

    return <div>
        <h3>{title}</h3>
        <div>
            <input
                value={newTaskTitle}
                onChange={inputOnChangeHandler}
                onKeyDown={addTaskOnEnterHandler}
            />
            <Button title={'+'} onClick={() => addTaskHandler()}
                    disabled={newTaskTitle.length < 3 || newTaskTitle.length > 10}/>
            <div>
                {newTaskTitle.length < 3 && 'title must be more then 3 chars'}
                {newTaskTitle.length > 10 && 'title must be less then 10 chars'}
            </div>
        </div>
        {taskList}
        <div>
            <Button
                title={'All'}
                onClick={() => changeFilter('all')}
            />
            <Button
                title={'Active'}
                onClick={() => changeFilter('active')}
            />
            <Button
                title={'Completed'}
                onClick={() => changeFilter('complete')}
            />
        </div>
    </div>
};

export default TodolistItem