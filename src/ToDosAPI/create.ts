import { ToDo } from './ToDo.type';
import { TODOS_TABLE, getDB } from './db';

export const createToDo = async (freshToDo: Omit<ToDo, 'id'>) => {
  //why do we do await getDB here because it already has an await in db.ts for getDB cant we just call it regularly here**
  const db = await getDB();
  // this transaction has 'readwrite' consequences**
  //what is a transaction and when do we use it do we only use it in indexed DB**
  const transaction = db.transaction([TODOS_TABLE], 'readwrite');
  const objectStore = transaction.objectStore(TODOS_TABLE);

  return new Promise<void>((resolve) => {
    // we're generating our own id ... but we could have configured (in db.ts) auto-increment keys**
    //where would we have generated the random id would it have been in get DB since its called in this file**
    //where in get DB would we call this if we wanted to put it in db.ts and how would we access it here for the id**
    const id = Date.now().toString();

    //why do we do transaction here and request in db.ts** how to know which to do**
    transaction.onerror = (event) => {
      console.log(`something went wrong creating ToDo ${id}`, event); //what would be the event in this case**
      resolve(); //what does this do**
    };

    transaction.oncomplete = (event) => {
      console.log(`created ToDo ${id}`, event); //what would be the event in this case**
      resolve(); //what does this do**
    };

    objectStore.add({
      //what does this do and why do we have add here do the storage methods in slide 2 not count for indexed DB**
      //this adds an entry into our sotrage with the id as key and object as value**
      //why dont we do JSON.stringify(objectStore) here then**
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
