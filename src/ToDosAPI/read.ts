import { ToDo } from './ToDo.type';
import { TODOS_TABLE, getDB } from './db';

//go over all**
export const readToDos = async () => {
  const db = await getDB();
  // this transaction will be using the TODOS_TABLE**
  const transaction = db.transaction([TODOS_TABLE]); //why did we not do readonly here like we have been doing
  //with readwrite in create, delete, and update**
  //if we dont put anything for transaction is the default read only
  // we want to work with the TODOS_TABLE as our object storage**
  //so is todos table our storage for all our objects (all our key value pairs)**
  const objectStore = transaction.objectStore(TODOS_TABLE);

  // readToDos will eventually resolve to a ToDo[]**
  return new Promise<ToDo[]>((resolve) => {
    // this is how we ask for all of the ToDos:**
    //from our storage get all the entires (how do we store it as a todos array to be used in main)**
    const request = objectStore.getAll();

    // set up the error handler**
    request.onerror = (event) => {
      console.log('something went wrong reading ToDos', event);
      // resolve to an empty list : []**
      resolve([]);
    };

    request.onsuccess = (event) => {
      //the event.target as any returns the whole JSON with each key (id) and value (object) pairs right
      //and are they both usually strings because we talked about how the key and value can be a lot of types for indexed DB only**
      //the key has to still be uniqiue though and we cant change the key once its made right like how it was for local
      //and session storage right**
      //local and session storage key and value had to be a string always right**
      console.log('read all ToDos', (event.target as any).result);
      // resolve with the result, which is a ToDos[]
      resolve((event.target as any).result); //how does the resolve give us an array of todos**
    };
  });
};
