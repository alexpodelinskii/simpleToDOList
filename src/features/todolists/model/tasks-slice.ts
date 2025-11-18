import { createAppSlice } from '@/common/utils/createAppSlice.ts';
import { tasksApi } from '@/features/todolists/api/tasksApi.ts';
import { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts';
import { changeStatusAC } from '@/app/app-slice.ts';

const initialState: TasksState = {};

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState,
  selectors: {
    selectTasks: (state) => state,
  },

  reducers: (create) => {
    return {
      fetchTasksTC: create.asyncThunk(
        async (todolistId: string, thunkAPI) => {
          const { rejectWithValue, dispatch } = thunkAPI;
          dispatch(changeStatusAC({ status: 'loading' }));
          try {
            const res = await tasksApi.getTasks(todolistId);
            dispatch(changeStatusAC({ status: 'succeeded' }));
            return { todolistId, tasks: res.data.items };
          } catch (err) {
            dispatch(changeStatusAC({ status: 'failed' }));
            return rejectWithValue(err);
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
          },
        }
      ),
      createTaskTC: create.asyncThunk(
        async (args: { todolistId: string; title: string }, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          try {
            const res = await tasksApi.createTask(args);
            return res.data.data.item;
          } catch (err) {
            return rejectWithValue(err);
          }
        },
        {
          fulfilled: (state, action) => {
            const newTask = action.payload;
            state[newTask.todoListId].unshift(newTask);
          },
        }
      ),
      updateTaskTC: create.asyncThunk(
        async (
          { todolistId, taskId, model }: { todolistId: string; taskId: string; model: UpdateTaskModel },
          thunkAPI
        ) => {
          const { rejectWithValue } = thunkAPI;
          try {
            const res = await tasksApi.updateTask({
              todolistId,
              taskId,
              model,
            });
            return res.data.data.item;
          } catch (err) {
            return rejectWithValue(err);
          }
        },
        {
          fulfilled: (state, action) => {
            const task = action.payload;
            state[task.todoListId].forEach((t, ind) => {
              if (t.id === task.id) {
                state[task.todoListId][ind] = { ...task };
              }
            });
          },
        }
      ),
      deleteTaskTC: create.asyncThunk(
        async (args: { todolistId: string; taskId: string }, thunkAPI) => {
          const { rejectWithValue } = thunkAPI;
          try {
            await tasksApi.deleteTask(args);
            return args;
          } catch (err) {
            return rejectWithValue(err);
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((task) => task.id === action.payload.taskId);
            if (index !== -1) {
              tasks.splice(index, 1);
            }
          },
        }
      ),
    };
  },
});
export const tasksReducer = tasksSlice.reducer;
export const { deleteTaskTC, createTaskTC, fetchTasksTC, updateTaskTC } = tasksSlice.actions;
export const { selectTasks } = tasksSlice.selectors;

export type TasksState = Record<string, DomainTask[]>;
