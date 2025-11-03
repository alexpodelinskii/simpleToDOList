import {RootState} from "../../../app/store.ts";
import {TodoListType} from "@/features/todolists/model/todolists-reducer.ts";


export const selectTodolists = (state:RootState):TodoListType[] => state.todolists
