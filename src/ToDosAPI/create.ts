import { ToDo } from './ToDo.type';

export const createToDo = async (freshToDo: Omit<ToDo, 'id'>) => {
  const request = new Request('http://localhost:3000/todos', {
    method: 'POST',
    body: JSON.stringify(freshToDo),
  });

  const response = await fetch(request);

  if (!response.ok) {
    console.log('something went wrong creating ToDo');
    return;
  }

  await response.json();

  // while response.json() does contain the newly created ToDo
  // we're deliberately not returning any data here
  // because we've made the design choice to always reload all ToDos
  // it's enough to await the response, and then continue
};
