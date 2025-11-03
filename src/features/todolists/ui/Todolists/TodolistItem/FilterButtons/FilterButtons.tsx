import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTodolistFilterAC, FilterValuesType, TodoListType} from "@/features/todolists/model/todolists-reducer.ts";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import {containerSx} from "@/common/styles/container.styles.ts";

type FilterButtonsPropsType = {
    todolistId: TodoListType["id"]
    filter: FilterValuesType
}

const FilterButtons = ({todolistId,filter}:FilterButtonsPropsType) => {
    const dispatch = useAppDispatch()


    const changeTodolistFilter = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id:todolistId, filter}))
    }
    return (
        <Box sx={containerSx}>
            <Button
                onClick={() => changeTodolistFilter('all')}
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
            >All</Button>
            <Button
                onClick={() => changeTodolistFilter('active')}
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
            >Active</Button>
            <Button
                onClick={() => changeTodolistFilter('complete')}
                variant={filter === 'complete' ? 'outlined' : 'text'}
                color={'secondary'}
            >Completed</Button>
        </Box>
    )
};

export default FilterButtons;