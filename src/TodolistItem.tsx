import {FilterValuesType, TaskType, TodoListTypes} from "./App.tsx";
import Button from "./button/Buttons.tsx";
import {ChangeEvent} from "react";
import {v1} from "uuid";
import CreateItemForm from "./createItemForm/CreateItemForm.tsx";
import EditableSpan from "./editableSpan/EditableSpan.tsx";


type PropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType['id'], todoListId: TodoListTypes["id"]) => void
    changeFilter: (status: FilterValuesType, todoListId: TodoListTypes["id"]) => void
    addTask: (newTask: TaskType, todoListId: TodoListTypes["id"]) => void
    changeTaskStatus: (taskId: TaskType['id'], newTaskStatus: TaskType['isDone'], todoListId: TodoListTypes["id"]) => void
    filter: FilterValuesType,
    todoListId: TodoListTypes["id"]
    deleteTaskList: (todoListId: TodoListTypes["id"]) => void
    changeTaskTitle: (payload: {
        taskId: TaskType['id'],
        todoListId: TodoListTypes["id"],
        title: TodoListTypes["title"]
    }) => void
    changeTodoListTitle : (payload:{title: string, id:TodoListTypes['id']})=>void
}


const TodolistItem = (
    {
        title,
        tasks,
        deleteTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
        todoListId,
        deleteTaskList,
        changeTaskTitle,
        changeTodoListTitle
    }: PropsType) => {

    const taskList = tasks.length === 0
        ? <span>Your tasklist is empty</span>
        : <ul>

            {

                tasks.map((task, ind) => {
                    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked, todoListId)
                    const changeTaskTitleHandler = (title: string) => changeTaskTitle({title, todoListId, taskId: task.id})

                    return (

                        <li key={ind} className={task.isDone ? 'task-done' : 'task'}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeTaskStatusHandler}
                            />
                            <EditableSpan value={task.title} changeValue={changeTaskTitleHandler}/><Button
                            title={'X'}
                            onClick={() => {
                                deleteTask(task.id, todoListId)
                            }}
                        />
                        </li>
                    )
                })}
        </ul>

    function addTaskHandler(title: string) {

        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        addTask(newTask, todoListId);

    }

    function isTaskParamsOk(value: string) {
        const trimmedValueLength = value.trim().length;
        return trimmedValueLength > 3 && trimmedValueLength < 10;
    }

    const changeTodolistTileHandler=(title:string)=>{
        changeTodoListTitle({title, id:todoListId})
    }
    return <div>
        <h3><EditableSpan value={title} changeValue={changeTodolistTileHandler}/>
            <Button title={'X'} onClick={() => deleteTaskList(todoListId)}/>
        </h3>


        <CreateItemForm addItem={addTaskHandler}
                        isOkValue={isTaskParamsOk} errorText={'task title must be more then 3 and less then 10 chars'}/>


        {
            taskList
        }
        <div>
            <Button
                title={'All'}
                onClick={() => changeFilter('all', todoListId)}
                classes={filter === 'all' ? 'filter-btn-active' : ''}
            />
            <Button
                title={'Active'}
                onClick={() => changeFilter('active', todoListId)}
                classes={filter === 'active' ? 'filter-btn-active' : ''}
            />
            <Button
                title={'Completed'}
                onClick={() => changeFilter('complete', todoListId)}
                classes={filter === 'complete' ? 'filter-btn-active' : ''}
            />
        </div>
    </div>
};

export default TodolistItem