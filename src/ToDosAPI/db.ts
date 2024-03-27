let db: IDBDatabase;

// some constants so we don't accidentally talk about the wrong DB or Table
export const DB_NAME = 'ToDoDatabase';
export const TODOS_TABLE = 'ToDos';

export const getDB = async (): Promise<IDBDatabase> => {
  if (db) {
    // if we already have a reference to the db, return it directly
    return db;
  }
  // otherwise, initialize the DB and return it afterwards
  await initDB();
  return db;
};

export const initDB = async () => {
  // return a Promise so whatever calls initDB has something to await or .then() on
  // we call resolve() to signal that the Promise is complete
  return new Promise<void>((resolve) => {
    // open the database, at version 1
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => {
      console.error('Something went wrong opening DB', event);
      // intentionally not calling resolve() here - because we won't have a valid db to work with
      // yes, this will probably prevent the application from functioning further
    };

    request.onsuccess = (event) => {
      console.log('success');
      // there aren't good typescript types for this event
      // so we cast it "as any" to get error-free access to .result
      db = (event.target as any).result;
      resolve();
    };

    request.onupgradeneeded = (event) => {
      // runs whenever the database is brand new,
      // or if the version number requested is different from what's already there
      console.log('upgrading');
      const database = (event.target as any).result;

      // the options provided here influence what type of data can be stored in the DB
      // see : https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#structuring_the_database
      const objectStore = database.createObjectStore(TODOS_TABLE, {
        keyPath: 'id',
      });

      // we technically don't have to create indexes for our use case
      // but if you want to be able to query the db by a field, it needs to be indexed with createIndex
      objectStore.createIndex('title', 'title', { unique: false });
      objectStore.createIndex('description', 'description', { unique: false });
    };
  });
};
