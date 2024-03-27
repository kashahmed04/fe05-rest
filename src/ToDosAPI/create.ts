import { ToDo } from './ToDo.type';

export const createToDo = async (freshToDo: Omit<ToDo, 'id'>) => {
  // generate our own id
  const id = Date.now().toString();

  // create the object
  const todo: ToDo = {
    id,
    ...freshToDo,
  };

  // the above is shorthand equivalent to
  /*
  const todo: ToDo = {
    id: id,
    title: freshToDo.title,
    description: freshToDo.description,
    complete: freshToDo.complete,
  };
  */

  // write it to localStorage
  localStorage.setItem(id, JSON.stringify(todo));
};
