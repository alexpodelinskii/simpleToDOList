import CreateItemForm from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {createTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {TodoListType} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import TodolistTitle from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import Tasks from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import FilterButtons from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";

type PropsType = {
    todolist: TodoListType
}

const TodolistItem = ({todolist}: PropsType) => {

    const {title, id: todolistId, filter} = todolist;

    const dispatch = useAppDispatch()

    function addTaskHandler(title: string) {
        dispatch(createTaskAC({title, todolistId}))
    }

    function isTaskParamsOk(value: string) {
        const trimmedValueLength = value.trim().length;
        return trimmedValueLength > 3 && trimmedValueLength < 10;
    }

    return <div>
        <TodolistTitle title={title} id={todolistId}/>
        <CreateItemForm addItem={addTaskHandler}
                        isOkValue={isTaskParamsOk}
                        errorText={'task title must be more then 3 and less then 10 chars'}/>
        <Tasks todolistId={todolistId} filter={filter}/>
        <FilterButtons todolistId={todolistId} filter={filter}/>
    </div>
};

export default TodolistItem