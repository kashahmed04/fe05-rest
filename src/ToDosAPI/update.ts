import { ToDo } from './ToDo.type';

export const toggleToDo = async (id: string, checked: boolean) => {
  // read the existing item
  const existingToDo: ToDo = JSON.parse(sessionStorage.getItem(id)!);

  // update it
  const alteredToDo: ToDo = {
    ...existingToDo,
    complete: !checked,
  };

  // and write it back
  sessionStorage.setItem(id, JSON.stringify(alteredToDo));
};

export const editToDo = async (id: string, editedToDo: Partial<ToDo>) => {
  // read the existing item
  const existingToDo: ToDo = JSON.parse(sessionStorage.getItem(id)!);

  // update it
  const alteredToDo: ToDo = {
    ...existingToDo,
    ...editedToDo,
  };

  // and write it back
  sessionStorage.setItem(id, JSON.stringify(alteredToDo));
};
