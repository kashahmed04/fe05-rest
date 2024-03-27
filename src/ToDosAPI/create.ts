import { ToDo } from './ToDo.type';

export const createToDo = async (freshToDo: Omit<ToDo, 'id'>) => {
  const id = Date.now().toString();
  const todo: ToDo = {
    id,
    ...freshToDo,
  };
  localStorage.setItem(id, JSON.stringify(todo));
};
