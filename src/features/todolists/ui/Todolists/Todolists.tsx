import {Grid, Paper} from "@mui/material";
import TodolistItem from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";

const Todolists = () => {
    const todoLists = useAppSelector(selectTodolists);

    return (
        < >
            {todoLists.map(tl => (
                <Grid key={tl.id}>
                    <Paper sx={{'mb': '30px'}}>
                        <TodolistItem todolist={tl}/>
                    </Paper>
                </Grid>
            ))}
        </>

    )

};

export default Todolists;