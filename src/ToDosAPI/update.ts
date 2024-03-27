import { ToDo } from './ToDo.type';
import { TODOS_TABLE, getDB } from './db';

export const toggleToDo = async (id: string, checked: boolean) => {
  const db = await getDB();
  const transaction = db.transaction([TODOS_TABLE], 'readwrite');
  const objectStore = transaction.objectStore(TODOS_TABLE);

  return new Promise<void>((resolve) => {
    const request = objectStore.get(id);

    request.onerror = (event) => {
      console.log(`something went wrong reading ToDo ${id} for toggle`, event);
      resolve();
    };

    request.onsuccess = (event) => {
      const toDo: ToDo = (event.target as any).result;

      toDo.complete = !checked;

      const updateRequest = objectStore.put(toDo);

      updateRequest.onerror = (event) => {
        console.log(
          `something went wrong writing ToDo ${id} for toggle`,
          event,
        );
        resolve();
      };

      updateRequest.onsuccess = (event) => {
        console.log(`toggled ToDo ${id}`, event);
        resolve();
      };
    };
  });
};

export const editToDo = async (id: string, editedToDo: Partial<ToDo>) => {
  const db = await getDB();
  const transaction = db.transaction([TODOS_TABLE], 'readwrite');
  const objectStore = transaction.objectStore(TODOS_TABLE);

  return new Promise<void>((resolve) => {
    const request = objectStore.get(id);

    request.onerror = (event) => {
      console.log(`something went wrong reading ToDo ${id} for edit`, event);
      resolve();
    };

    request.onsuccess = (event) => {
      const toDo: ToDo = (event.target as any).result;

      toDo.title = editedToDo.title || toDo.title;
      toDo.description = editedToDo.description || toDo.description;

      const updateRequest = objectStore.put(toDo);

      updateRequest.onerror = (event) => {
        console.log(`something went wrong writing ToDo ${id} for edit`, event);
        resolve();
      };

      updateRequest.onsuccess = (event) => {
        console.log(`edited ToDo ${id}`, event);
        resolve();
      };
    };
  });
};
