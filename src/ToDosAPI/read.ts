import { ToDo } from './ToDo.type';

export const readToDos = async () => {
  const toDos: ToDo[] = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    let toDo: ToDo = JSON.parse(
      sessionStorage.getItem(sessionStorage.key(i)!)!,
    );
    toDos.push(toDo);
  }
  return toDos;
};
