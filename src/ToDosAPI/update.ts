import { ToDo } from './ToDo.type';
import { TODOS_TABLE, getDB } from './db';

export const toggleToDo = async (id: string, checked: boolean) => {
  //go over all**
  const db = await getDB();
  const transaction = db.transaction([TODOS_TABLE], 'readwrite');
  const objectStore = transaction.objectStore(TODOS_TABLE);

  return new Promise<void>((resolve) => {
    const request = objectStore.get(id); //get the object we want based on the id we passed in from main from the indexed DB storage**

    request.onerror = (event) => {
      console.log(`something went wrong reading ToDo ${id} for toggle`, event);
      resolve();
    };

    request.onsuccess = (event) => {
      // we read it first
      //we make what is returned into a todo item**
      const toDo: ToDo = (event.target as any).result;

      // then alter it
      //(change the checked to the oppossite once we click it in the todo object)**
      toDo.complete = !checked;

      // then put it back
      //so we have add, delete, put, and what else for indexed DB and is this only available within index DB and nowehere else and
      //we use the storage methods on slide 2 for local and session storage**
      //why did we not do add and why did we do put here instead whats the difference**
      //does put allow us to edit in a certain entry is that why whereas add just adds it to the end of the JSON?? or storage??**
      const updateRequest = objectStore.put(toDo);

      // handle the put-back error**
      updateRequest.onerror = (event) => {
        console.log(
          `something went wrong writing ToDo ${id} for toggle`,
          event,
        );
        resolve(); //when do we know to use resolve or not**
        //why dont we use it in the method above for onsuccess but we use it in our errors and our onsuccess below**
      };

      // handle the put-back success**
      updateRequest.onsuccess = (event) => {
        console.log(`toggled ToDo ${id}`, event); //which events are these usually for the onerror, onsuccess, and onupgradeneeded**
        //are these the events we should know**
        resolve();
      };
    };
  });
};

//go over**
export const editToDo = async (id: string, editedToDo: Partial<ToDo>) => {
  //what do these commands do**
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
      // read the existing ToDo
      const toDo: ToDo = (event.target as any).result;

      //alter it (with a fallback to what was already there)
      //we have it to what was already there in case we dont change it right why would we need this
      //because it would update reglardless if we didnt change the entry**
      toDo.title = editedToDo.title || toDo.title;
      toDo.description = editedToDo.description || toDo.description;

      // and put it back
      //does this target our whole JSON file and put the todo item back in at the same exact location we got it from with put**
      //when we target data from a JSON file does it take it out from the JSON and give it to us or does it still
      //remain in the JSON and give it to us (makes a copy for us while still in the JSON)**
      const updateRequest = objectStore.put(toDo);

      //go over**
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
