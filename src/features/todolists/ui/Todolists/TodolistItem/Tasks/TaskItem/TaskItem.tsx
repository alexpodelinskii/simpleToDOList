import { EditableSpan } from '@/common/components';
import { useAppDispatch } from '@/common/hooks';
import { deleteTaskTC, updateTaskTC } from '@/features/todolists/model/tasks-slice.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import type { ChangeEvent } from 'react';
import { getListItemSx } from './TaskItem.styles';
import { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts';
import { TaskStatus } from '@/common/enums';

type Props = {
  task: DomainTask;
  todolistId: string;
};

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch();
  const getModel = () => {
    return {
      deadline: task.deadline,
      description: task.description,
      title: task.title,
      status: task.status,
      startDate: task.startDate,
      priority: task.priority,
    };
  };
  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }));
  };

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const model = getModel();
    model.status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    dispatch(updateTaskTC({ todolistId, taskId: task.id, model }));
  };

  const changeTaskTitle = (title: string) => {
    const model = getModel();
    model.title = title;
    dispatch(updateTaskTC({ todolistId, taskId: task.id, model }));
  };

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
