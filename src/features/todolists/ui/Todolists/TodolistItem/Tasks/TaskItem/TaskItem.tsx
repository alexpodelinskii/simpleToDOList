import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, TaskType} from "@/features/todolists/model/tasks-reducer.ts";
import {TodoListType} from "@/features/todolists/model/todolists-reducer.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./TaskItem.styles.ts";
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "@/common/components/EditableSpan/EditableSpan.tsx";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskItemPropsType = {
    task: TaskType
    todolistId: TodoListType["id"]
}

const TaskItem = ({task, todolistId}: TaskItemPropsType) => {

    const dispatch = useAppDispatch()

    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({
            taskId: task.id,
            todolistId,
            isDone: event.currentTarget.checked
        }))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({taskId: task.id, todolistId, title}))
    }


    return (
        <ListItem sx={getListItemSx(task.isDone)}>
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
                    dispatch(deleteTaskAC({todolistId, taskId: task.id}))
                }}>
                <DeleteIcon/>
            </IconButton>

        </ListItem>
    );
};

export default TaskItem;