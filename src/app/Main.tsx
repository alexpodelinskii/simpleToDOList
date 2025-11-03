import {Container, Grid} from "@mui/material";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTodolistAC, TodoListType} from "@/features/todolists/model/todolists-reducer";
import CreateItemForm from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import Todolists from "@/features/todolists/ui/Todolists/Todolists.tsx";


const Main = () => {

    const dispatch = useAppDispatch()

    const createTodoList = (title: TodoListType["title"]) => {
        dispatch(createTodolistAC(title));
    }

    function isTaskParamsOk(value: string) {
        const trimmedValueLength = value.trim().length;
        return trimmedValueLength >= 3 && trimmedValueLength < 10;
    }


    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{'mb': '30px'}}>
                <CreateItemForm addItem={createTodoList} isOkValue={isTaskParamsOk}
                                errorText={'todolist title must be more then 2 and less then 10 chars'}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};

export default Main;