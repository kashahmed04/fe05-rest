import { ToDo } from './ToDo.type';
import { TODOS_TABLE, getDB } from './db';

export const createToDo = async (freshToDo: Omit<ToDo, 'id'>) => {
  const db = await getDB();
  // this transaction has 'readwrite' consequences
  const transaction = db.transaction([TODOS_TABLE], 'readwrite');
  const objectStore = transaction.objectStore(TODOS_TABLE);

  return new Promise<void>((resolve) => {
    // we're generating our own id ... but we could have configured (in db.ts) auto-increment keys
    const id = Date.now().toString();

    transaction.onerror = (event) => {
      console.log(`something went wrong creating ToDo ${id}`, event);
      resolve();
    };

    transaction.oncomplete = (event) => {
      console.log(`created ToDo ${id}`, event);
      resolve();
    };

    objectStore.add({
      id,
      ...freshToDo,
    });

    // the above is a shorthand equivalent to:
    /*
    objectStore.add({
      id: id,
      title: freshToDo.title,
      description: freshToDo.description,
      complete: freshToDo.complete,
    });
    */
  });
};
