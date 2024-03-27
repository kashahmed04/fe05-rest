import { ToDo } from './ToDo.type';
import { TODOS_TABLE, getDB } from './db';

export const readToDos = async () => {
  const db = await getDB();
  // this transaction will be using the TODOS_TABLE
  const transaction = db.transaction([TODOS_TABLE]);
  // we want to work with the TODOS_TABLE as our object storage
  const objectStore = transaction.objectStore(TODOS_TABLE);

  // readToDos will eventually resolve to a ToDo[]
  return new Promise<ToDo[]>((resolve) => {
    // this is how we ask for all of the ToDos:
    const request = objectStore.getAll();

    // set up the error handler
    request.onerror = (event) => {
      console.log('something went wrong reading ToDos', event);
      // resolve to an empty list : []
      resolve([]);
    };

    request.onsuccess = (event) => {
      console.log('read all ToDos', (event.target as any).result);
      // resolve with the result, which is a ToDos[]
      resolve((event.target as any).result);
    };
  });
};
