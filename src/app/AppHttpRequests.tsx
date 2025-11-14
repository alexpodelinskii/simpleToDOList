import { type ChangeEvent, type CSSProperties, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { CreateItemForm, EditableSpan } from '@/common/components';
import { Todolist } from '@/features/todolists/api/todolistsApi.types.ts';
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts';
import { tasksApi } from '@/features/todolists/api/tasksApi.ts';
import { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts';
import { TaskStatus } from '@/common/enums/enums.ts';

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({});

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data;
      setTodolists(todolists);

      const tasksPromises = todolists.map((tl) => {
        return tasksApi.getTasks(tl.id).then((res) => {
          return { [tl.id]: res.data.items };
        });
      });
      Promise.all(tasksPromises).then((res) => {
        const tasksState = res.reduce((acc, el) => {
          return { ...acc, ...el };
        }, {});
        setTasks(tasksState);
      });
    });
  }, []);

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item;
      setTodolists([newTodolist, ...todolists]);
    });
  };

  const deleteTodolist = (payload: { id: string }) => {
    todolistsApi.deleteTodolist(payload).then(() => {
      setTodolists(todolists.filter((tl) => tl.id !== payload.id));
    });
  };

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle(id, title).then(() => {
      setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : { ...tl })));
    });
  };

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask({ todolistId, title }).then(() => {
      tasksApi.getTasks(todolistId).then((res) => {
        setTasks({ ...tasks, [todolistId]: res.data.items });
      });
    });
  };

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask({ todolistId, taskId }).then(() => {
      tasksApi.getTasks(todolistId).then((res) => {
        setTasks({ ...tasks, [todolistId]: res.data.items });
      });
    });
  };

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      deadline: task.deadline,
      startDate: task.startDate,
      priority: task.priority,
      status,
    };

    tasksApi
      .updateTask({
        todolistId: task.todoListId,
        taskId: task.id,
        model,
      })
      .then(() => {
        tasksApi.getTasks(task.todoListId).then((res) => {
          setTasks({ ...tasks, [task.todoListId]: res.data.items });
        });
      });
  };

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const model: UpdateTaskModel = {
      description: task.description,
      title,
      deadline: task.deadline,
      startDate: task.startDate,
      priority: task.priority,
      status: task.status,
    };
    tasksApi
      .updateTask({
        todolistId: task.todoListId,
        taskId: task.id,
        model,
      })
      .then(() => {
        tasksApi.getTasks(task.todoListId).then((res) => {
          setTasks({ ...tasks, [task.todoListId]: res.data.items });
        });
      });
  };

  return (
    <div style={{ margin: '20px' }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist: Todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan value={todolist.title} onChange={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task: DomainTask) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const container: CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
};
