import { ToDo } from './ToDo.type';
import { TODOS_TABLE, getDB } from './db';

/**
 *
 *
 *
 */
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

    //why dont we do objectStore here instead of transaction because in read and update we did that with out requests
    //so doesnt add count as a request why did we put transaction here instead****
    transaction.oncomplete = (event) => {
      console.log(`created ToDo ${id}`, event); //what would be the event in this case**
      resolve(); //what does this do**
    };

    //so when we get to this promise does it do the add to the table then on oncomplete otherwise the onerror if it did not work****
    //(what is the order of execution how does it know)****

    objectStore.add({
      //object store is the actual table to add and remove things
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

//get, getall, put, add, and delete for the index DB API and get is one specific thing and we dont need it here
//since we get things by the id

//even if we restart our computer, close the tab, or reload the tab it remains for data but earses if we erase of storage in browser
//gets full so it does it automatically to erase
//for session when we close tab then information is gone but if we reload or switch tab and come back but tab it open
//then data remains there and if we go to another page or url and we come back then the data remains there
//maintins the data even if we close the tab (but for hot key to open tab again not for doing it with mouse)
//but if we quit the browser and come abck it goes away
