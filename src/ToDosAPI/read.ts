import { ToDo } from './ToDo.type';

export const readToDos = async () => {
  const toDos: ToDo[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    let toDo: ToDo = JSON.parse(localStorage.getItem(localStorage.key(i)!)!);
    toDos.push(toDo);
  }
  return toDos;
};
