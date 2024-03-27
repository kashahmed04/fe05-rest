import { ToDo } from './ToDo.type';

export const createToDo = async (freshToDo: Omit<ToDo, 'id'>) => {
  // generate our own id
  const id = Date.now().toString();

  // create a ToDO
  const todo: ToDo = {
    id,
    ...freshToDo,
  };

  // the above is a shorthand equivalent of
  /*
  const todo: ToDo = {
    id: id,
    title: freshToDo.title,
    description: freshToDo.description,
    complete: freshToDo.complete,
  };
  */

  // write it to storage
  sessionStorage.setItem(id, JSON.stringify(todo));
};

//main difference between this file and local storage was that everything on slide 2 would say sessionStorage
//instead of localStorage (yes)
