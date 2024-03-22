import { ToDo } from './ToDo.type';

export const toggleToDo = async (id: string, checked: boolean) => {
  const alteredToDo: Partial<ToDo> = {
    complete: !checked,
  };

  const request = new Request(`http://localhost:3000/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(alteredToDo),
  });

  const response = await fetch(request);

  if (!response.ok) {
    console.log('something went wrong patching ToDo ' + id);
    return;
  }

  await response.json();

  // while response.json() does contain the updated ToDo
  // we're deliberately not returning any data here
  // because we've made the design choice to always reload all ToDos
  // it's enough to await the response, and then continue
};

export const editToDo = async (id: string, editedToDo: Partial<ToDo>) => {
  // Step 2 Code Goes Here:
};
