import { ToDo } from './ToDo.type';

export const readToDos = async () => {
  const request = new Request('http://localhost:3000/todos', {
    method: 'GET',
  });

  const response = await fetch(request);

  if (!response.ok) {
    console.log('something went wrong loading ToDos');
    // return an empty array when an error happens
    return [];
  }

  const data: ToDo[] = await response.json();

  // we actually return the data this time!
  // because the app will actually use it
  return data;
};
