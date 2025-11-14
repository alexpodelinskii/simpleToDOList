import type { RootState } from '@/app/store';
import type { TasksState } from './tasks-slice.ts';

export const _selectTasks = (state: RootState): TasksState => state.tasks;
