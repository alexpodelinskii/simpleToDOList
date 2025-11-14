import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todolist } from '@/features/todolists/api/todolistsApi.types.ts';
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts';

const initialState: DomainTodolist[] = [];
export const todolistSLice = createSlice({
  name: 'todolists',
  initialState,
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => {
    return {
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id);
        if (todolist) {
          todolist.filter = action.payload.filter;
        }
      }),
    };
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistTC.fulfilled, (_state, action) => {
        return action.payload.todolists.map((tl) => {
          return { ...tl, filter: 'all' };
        });
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift(action.payload);
      });
  },
});

export const fetchTodolistTC = createAsyncThunk(`${todolistSLice.name}/fetchTodolistTC`, async (_arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await todolistsApi.getTodolists();
    return { todolists: res.data };
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistSLice.name}/changeTodolistTitleTC`,
  async (args: { id: string; title: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await todolistsApi.changeTodolistTitle(args);
      return { ...args };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteTodolistTC = createAsyncThunk(
  `${todolistSLice.name}/deleteTodolistTC`,
  async (args: { id: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await todolistsApi.deleteTodolist(args);
      return { ...args };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const createTodolistTC = createAsyncThunk(
  `${todolistSLice.name}/createTodolistTC`,
  async (args: { title: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await todolistsApi.createTodolist(args.title);

      const newTodolist: DomainTodolist = {
        filter: 'all',
        ...res.data.data.item,
      };
      return newTodolist;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const todolistsReducer = todolistSLice.reducer;
export const { changeTodolistFilterAC } = todolistSLice.actions;
export const { selectTodolists } = todolistSLice.selectors;
export type DomainTodolist = Todolist & { filter: FilterValues };
export type FilterValues = 'all' | 'active' | 'completed';
