import {FilterValuesType, TaskType, TodoListType} from "../App.tsx";
import {ChangeEvent} from "react";
import CreateItemForm from "../createItemForm/CreateItemForm.tsx";
import EditableSpan from "../editableSpan/EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from "@mui/material/Button";
import {Checkbox, ListItem, List, Box} from "@mui/material";
import {containerSx, getListItemSx} from "./TodoListItem.styles.ts";


type PropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType['id'], todoListId: TodoListType["id"]) => void
    changeFilter: (status: FilterValuesType, todoListId: TodoListType["id"]) => void
    addTask: (title: TaskType["title"], todoListId: TodoListType["id"]) => void
    changeTaskStatus: (taskId: TaskType['id'], newTaskStatus: TaskType['isDone'], todoListId: TodoListType["id"]) => void
    filter: FilterValuesType,
    todoListId: TodoListType["id"]
    deleteTaskList: (todoListId: TodoListType["id"]) => void
    changeTaskTitle: (payload: {
        taskId: TaskType['id'],
        todoListId: TodoListType["id"],
        title: TodoListType["title"]
    }) => void
    changeTodoListTitle: (payload: { title: string, id: TodoListType['id'] }) => void
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
        : <List>

            {

                tasks.map((task, ind) => {
                    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked, todoListId)
                    const changeTaskTitleHandler = (title: string) => changeTaskTitle({
                        title,
                        todoListId,
                        taskId: task.id
                    })

                    return (

                        <ListItem key={ind}
                                  sx={getListItemSx(task.isDone)}>
                            <div>
                                <Checkbox
                                    checked={task.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan
                                    value={task.title}
                                    changeValue={changeTaskTitleHandler}
                                />
                            </div>

                            <IconButton
                                size={'small'}
                                onClick={() => {
                                    deleteTask(task.id, todoListId)
                                }}>
                                <DeleteIcon/>
                            </IconButton>

                        </ListItem>
                    )
                })}
        </List>

    function addTaskHandler(title: string) {


        addTask(title, todoListId);

    }

    function isTaskParamsOk(value: string) {
        const trimmedValueLength = value.trim().length;
        return trimmedValueLength > 3 && trimmedValueLength < 10;
    }

    const changeTodolistTileHandler = (title: string) => {
        changeTodoListTitle({title, id: todoListId})
    }
    return <div>
        <h3><EditableSpan value={title} changeValue={changeTodolistTileHandler}/>
            <IconButton size={'small'} onClick={() => deleteTaskList(todoListId)}>
                <DeleteIcon/>
            </IconButton>

        </h3>


        <CreateItemForm addItem={addTaskHandler}
                        isOkValue={isTaskParamsOk} errorText={'task title must be more then 3 and less then 10 chars'}/>


        {
            taskList
        }
        <Box sx={containerSx}>
            <Button

                onClick={() => changeFilter('all', todoListId)}
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
            >All</Button>
            <Button
                onClick={() => changeFilter('active', todoListId)}
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
            >Active</Button>
            <Button
                onClick={() => changeFilter('complete', todoListId)}
                variant={filter === 'complete' ? 'outlined' : 'text'}
                color={'secondary'}
            >Completed</Button>
        </Box>
    </div>
};

export default TodolistItem