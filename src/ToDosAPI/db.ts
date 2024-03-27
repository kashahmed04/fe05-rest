let db: IDBDatabase;

// some constants so we don't accidentally talk about the wrong DB or Table
//what does it mean by DB or table**
//how did we know these were the constant names to use across all of our files when we import these**
//why did we not import the DB_NAME in any of our files but we export it here**
export const DB_NAME = 'ToDoDatabase';
export const TODOS_TABLE = 'ToDos';

export const getDB = async (): Promise<IDBDatabase> => {
  if (db) {
    // if we already have a reference to the db, return it directly
    // is it if we already have a reference to all the storage data just return the reference**
    // when would we already have a reference to all the storage data**
    return db;
  }
  // otherwise, initialize the DB and return it afterwards
  //could we have done an else here or was it not necessary since it was the end**
  //we would wait utnil we got all the data from the storage then return our reference to it if we already dont have a reference**
  await initDB();
  return db;
};

export const initDB = async () => {
  // return a Promise so whatever calls initDB has something to await or .then() on
  // we call resolve() to signal that the Promise is complete**
  // go over**
  return new Promise<void>((resolve) => {
    // open the database, at version 1**
    // we could say 2, 3, 4 here and up until what number when we want to**
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => {
      console.error('Something went wrong opening DB', event); //what would be the event in this case**
      // intentionally not calling resolve() here - because we won't have a valid db to work with**
      // yes, this will probably prevent the application from functioning further**
      //how would it prevent the application from functioning further**
      //why did we not do resolve() here but we did in create**
      ////what does this do**
    };

    request.onsuccess = (event) => {
      console.log('success');
      // there aren't good typescript types for this event
      // so we cast it "as any" to get error-free access to .result
      //this returns our whole JSON storage right with all the key value pairs**
      //does this get returned as an array with objects inside or just all the objects??**
      db = (event.target as any).result; //why do we set it equal to db here but not in onupgradeneeded**
      resolve(); //why do we call this here how do we know when to call resolve**
      //what would be the event in this case**
    };

    request.onupgradeneeded = (event) => {
      // runs whenever the database is brand new,**
      // or if the version number requested is different from what's already there**
      console.log('upgrading');
      const database = (event.target as any).result; //what would be the event in this case**

      // the options provided here influence what type of data can be stored in the DB**
      // see : https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#structuring_the_database
      const objectStore = database.createObjectStore(TODOS_TABLE, {
        //go over**
        keyPath: 'id',
      });

      //go over**
      // we technically don't have to create indexes for our use case**
      // but if you want to be able to query the db by a field, it needs to be indexed with createIndex**
      //so we can get a whole todo object back based on the title or description then why is it written twice here**
      //and what is unique equals false**
      objectStore.createIndex('title', 'title', { unique: false });
      objectStore.createIndex('description', 'description', { unique: false });

      //why dont we do resolve here**
      ////what does this do**
    };
  });
};
