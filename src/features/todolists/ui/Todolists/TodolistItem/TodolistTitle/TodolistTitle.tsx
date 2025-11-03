import EditableSpan from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, deleteTodolistAC, TodoListType} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import styles from './TodolistTitle.module.css'

type  TodolistTitlePropsType = {
    title: string
    id: string
}

const TodolistTitle = ({title, id}: TodolistTitlePropsType) => {

    const dispatch = useAppDispatch()

    const changeTodolistTileHandler = (title: string) => {
        changeTodoListTitle({title, id})
    }
    const changeTodoListTitle = (payload: { title: TodoListType["title"], id: TodoListType['id'] }) => {
        dispatch(changeTodolistTitleAC(payload))
    }
    const deleteTodoList = (todoListId: TodoListType["id"]) => {
        dispatch(deleteTodolistAC({id: todoListId}));
    }
    return (
        <div className={styles.container}>
            <h3><EditableSpan value={title} changeValue={changeTodolistTileHandler}/>
                <IconButton size={'small'} onClick={() => deleteTodoList(id)}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
        </div>


    );
};

export default TodolistTitle;