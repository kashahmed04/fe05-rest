export const deleteToDo = async (id: string) => {
  const request = new Request(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE',
  });

  const response = await fetch(request);

  if (!response.ok) {
    console.log('something went wrong deleting ToDo ' + id);
    return;
  }

  await response.json();

  // while response.json() does contain the newly deleted ToDo
  // we're deliberately not returning any data here
  // because we've made the design choice to always reload all ToDos
  // it's enough to await the response, and then continue
};
