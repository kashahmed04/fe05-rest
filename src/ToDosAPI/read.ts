import { ToDo } from './ToDo.type';

export const readToDos = async () => {
  const toDos: ToDo[] = [];

  // iterate over all items in sessionStorage
  for (let i = 0; i < sessionStorage.length; i++) {
    // get the key at index i
    const key = sessionStorage.key(i);
    // get the value stored under the key
    const toDoString = sessionStorage.getItem(key!);
    // convert it from a JSON string to an actual POJO (plain old javascript object) ToDo
    const toDo: ToDo = JSON.parse(toDoString!);
    // add it to the list of results
    toDos.push(toDo);
  }

  return toDos;
};
