import {TaskType} from "@/features/todolists/model/tasks-reducer.ts";
import {FilterValuesType, TodoListType} from "@/features/todolists/model/todolists-reducer.ts";
import {List} from "@mui/material";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTasks} from "@/features/todolists/model/tasks-selectors";
import TaskItem from "./TaskItem/TaskItem";

type TasksPropsType = {
    todolistId: TodoListType["id"]
    filter: TodoListType["filter"]
}

const Tasks = ({todolistId, filter}: TasksPropsType) => {

    const tasksState = useAppSelector(selectTasks)

    const getTasksForRender = (tasks: TaskType[], filter: FilterValuesType) => {

        if (filter === "active") {
            return tasks.filter(task => !task.isDone);
        }
        if (filter === "complete") {
            return tasks.filter(task => task.isDone);
        }
        return tasks
    }
    const tasks = getTasksForRender(tasksState[todolistId], filter)

    return (
        <>
            {
                tasks.length === 0
                    ? <span>Your tasklist is empty</span>
                    : <List>
                        {
                            tasks.map((task, ind) => (
                                    <TaskItem task={task} key={ind} todolistId={todolistId}/>
                                )
                            )}
                    </List>
            }
        </>
    );
};

export default Tasks;