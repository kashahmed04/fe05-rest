import { TODOS_TABLE, getDB } from './db';

export const deleteToDo = async (id: string) => {
  const db = await getDB();
  // we can chain these calls together, if we wish:
  const request = db
    .transaction([TODOS_TABLE], 'readwrite')
    .objectStore(TODOS_TABLE)
    .delete(id);

  return new Promise<void>((resolve) => {
    request.onerror = (event) => {
      console.log(`something went wrong deleting ToDo ${id}`, event);
      resolve();
    };

    request.onsuccess = (event) => {
      console.log(`deleted ToDo ${id}`, event);
      resolve();
    };
  });
};
