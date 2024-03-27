import { ToDo } from './ToDo.type';
import { TODOS_TABLE, getDB } from './db';

export const readToDos = async () => {
  const db = await getDB();
  const transaction = db.transaction([TODOS_TABLE]);
  const objectStore = transaction.objectStore(TODOS_TABLE);

  return new Promise<ToDo[]>((resolve) => {
    const request = objectStore.getAll();

    request.onerror = (event) => {
      console.log('something went wrong reading ToDos', event);
      resolve([]);
    };

    request.onsuccess = (event) => {
      console.log('read all ToDos', (event.target as any).result);
      resolve((event.target as any).result);
    };
  });
};
