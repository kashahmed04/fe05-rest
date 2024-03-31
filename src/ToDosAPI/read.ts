import { ToDo } from './ToDo.type';
import { TODOS_TABLE, getDB } from './db';

/**
 *
 * get the data base then make transsaction for todos table then get the objectstore for that object store
 * then get all gives us the request and if successful then we return the result otherwise if we fail we resolve to empty array
 * if there are no todos and in the end when its sucessful then we return array of todos
 *
 */
export const readToDos = async () => {
  const db = await getDB();
  // this transaction will be using the TODOS_TABLE**
  //by default its read only for transaction
  const transaction = db.transaction([TODOS_TABLE]); //why did we not do readonly here like we have been doing
  //with readwrite in create, delete, and update**
  //if we dont put anything for transaction is the default read only
  // we want to work with the TODOS_TABLE as our object storage**
  //so is todos table our storage for all our objects (all our key value pairs)**
  const objectStore = transaction.objectStore(TODOS_TABLE);

  //index db is a transactional data bse and it does not automatically execute an action and we queue  a bunch of actions
  //as a trasnaction and will attempt to do trasnaction and if it suceeds good otherwise if it fails then it rolls the database
  //back to how it was before we did the transaction
  //the object store is the table itself and we are saying the transaction uses the todos object scroes table
  //and we are getting all the objects from that table (the transaction needs to table to work)
  //and transaction would be using tables and we define different tables we want to use
  //and the object store would make those in comma seperated list in one command to use those as a table

  //transaction is maybe if multiple places in our app wants to access to todo table and we want to lock todos table
  //so nothing else works on it and this transaction will touch this table and nobody else touch it otherwise wait to use it until
  //something else is done using it and the object store is actually doing the operation**
  //transaction is the overall operation and the object store is one part of the transaction

  //transaction is the actual operation we need to do (wait in a queue to wait and touch data base or reserve it so nothing
  //else can touch it if its available)**** while the object store is responsbile for
  //passing that operation (data)**** into the JSON that we want to work with
  //(the data we got back from JSON or want to send to JSON from the transaction (both))****

  // readToDos will eventually resolve to a ToDo[]**
  return new Promise<ToDo[]>((resolve) => {
    // this is how we ask for all of the ToDos:**
    //from our storage get all the entires (how do we store it as a todos array to be used in main)**
    const request = objectStore.getAll(); //would we say a specific id in the () if we said get() and everything else would be the same
    //but instead of an array returning it would just be Promise<ToDo>****
    //(how would onerror resolve([]) change the resolve in onsuccess)****

    //how do we know when to put our request in the promise or not because we did not for delete and does it matter
    //where we put the request in the promise because for create it was in the bottom of the promise but in read, and update
    //it was on the top of the promise****

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

      //does it automatically put it in an array for us how does it know if we put it in the promise like that**** (how does it
      //know to put each todo object in the array if everyhing gets returned at once from JSON)****
    };
  });
};
