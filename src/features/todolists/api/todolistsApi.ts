import { instance } from '@/common/instance/instance.ts';
import { Todolist } from '@/features/todolists/api/todolistsApi.types.ts';
import { BaseResponse } from '@/common/types';

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>(`/todo-lists`);
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>(`/todo-lists`, { title });
  },
  deleteTodolist(payload: { id: string }) {
    return instance.delete<BaseResponse>(`/todo-lists/${payload.id}`);
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    return instance.put<BaseResponse>(`/todo-lists/${payload.id}`, { title: payload.title });
  },
};
