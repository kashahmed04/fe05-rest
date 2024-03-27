import { ToDo } from './ToDo.type';
import { TODOS_TABLE, getDB } from './db';

export const createToDo = async (freshToDo: Omit<ToDo, 'id'>) => {
  const db = await getDB();
  const transaction = db.transaction([TODOS_TABLE], 'readwrite');
  const objectStore = transaction.objectStore(TODOS_TABLE);

  return new Promise<void>((resolve) => {
    const id = Date.now().toString();

    transaction.onerror = (event) => {
      console.log(`something went wrong creating ToDo ${id}`, event);
      resolve();
    };

    transaction.oncomplete = (event) => {
      console.log(`created ToDo ${id}`);
      resolve();
    };

    objectStore.add({
      id,
      ...freshToDo,
    });
  });
};
