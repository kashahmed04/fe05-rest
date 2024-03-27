import { ToDo } from './ToDo.type';

export const toggleToDo = async (id: string, checked: boolean) => {
  // read what's there
  const existingToDo: ToDo = JSON.parse(localStorage.getItem(id)!);

  // alter it
  const alteredToDo: ToDo = {
    ...existingToDo,
    complete: !checked,
  };

  // and write it back
  localStorage.setItem(id, JSON.stringify(alteredToDo));
};

export const editToDo = async (id: string, editedToDo: Partial<ToDo>) => {
  // read what's there
  const existingToDo: ToDo = JSON.parse(localStorage.getItem(id)!);

  // alter it
  const alteredToDo: ToDo = {
    ...existingToDo,
    ...editedToDo,
  };

  // and write it back
  localStorage.setItem(id, JSON.stringify(alteredToDo));
};
