import type { RootState } from '@/app/store';
import type { DomainTodolist } from './todolists-slice.ts';

export const _selectTodolists = (state: RootState): DomainTodolist[] => state.todolists;
