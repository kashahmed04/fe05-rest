import { ToDo } from './ToDo.type';

export const toggleToDo = async (id: string, checked: boolean) => {
  const existingToDo: ToDo = JSON.parse(sessionStorage.getItem(id)!);
  const alteredToDo: ToDo = {
    ...existingToDo,
    complete: !checked,
  };
  sessionStorage.setItem(id, JSON.stringify(alteredToDo));
};

export const editToDo = async (id: string, editedToDo: Partial<ToDo>) => {
  const existingToDo: ToDo = JSON.parse(sessionStorage.getItem(id)!);
  const alteredToDo: ToDo = {
    ...existingToDo,
    ...editedToDo,
  };
  sessionStorage.setItem(id, JSON.stringify(alteredToDo));
};
