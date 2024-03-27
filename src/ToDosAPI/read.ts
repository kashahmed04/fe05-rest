import { ToDo } from './ToDo.type';

export const readToDos = async () => {
  const toDos: ToDo[] = [];

  // iterate over all items in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    // get the key at index i
    const key = localStorage.key(i);
    // get the value stored under the key
    const toDoString = localStorage.getItem(key!);
    // convert it from a JSON string to an actual POJO (plain old javascript object) ToDo
    const toDo: ToDo = JSON.parse(toDoString!);
    // add it to the list of results
    toDos.push(toDo);
  }

  return toDos;
};
