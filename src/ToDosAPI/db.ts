let db: IDBDatabase;

/**
 * all of our CRUD needs this db.ts and when we run this we already created the connection or we need to initialize it
 * and if we created the thing then we return it otherwise initialize it**
 *
 * open the data base and when we open it then its going to work immediately otherwise its going to call the upgraded event
 * to define the event and in the data base we have a todos table that index of key of id then they might also have indexes
 * like title and description and the browser will call upgrade needed when we crrate database from scartch and no data base
 * in browser and if we want to change upgrade to run from data bases
 *
 * once upgradeneeded has ran then it calls onsuccess then it saves the thing in the data base and resolves the promise**
 *
 * return new Promise<void>((resolve) => { we created a promise and it does not return
 * the anything and eventually we call resolve to solve our promise and we are ready to proceed somewhere else
 * so our other files will have await initDB or initDB.then to run next for us to do a promise in our other file
 *
 */

// some constants so we don't accidentally talk about the wrong DB or Table
//what does it mean by DB or table**
//how did we know these were the constant names to use across all of our files when we import these**
//why did we not import the DB_NAME in any of our files but we export it here**
export const DB_NAME = 'ToDoDatabase';
export const TODOS_TABLE = 'ToDos';

//for this the very first time we go trhough we load the db file and it gets defined in db = (event.target as any).result;
//then the next time we go through the conditioanl gets ran now because we defined the db
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
    // if we were web developer and we pushed website live and we are using version 1 and if we have users
    //that have used our application and now they have their own index db at version 1 and if we have a new feature to make
    //that involves the database and to change the feature we update the version to 2 so we can do our updates and the next time
    //they load they load the app they would have to upgrade to the current version
    //the user will see it when we published to our web server somewhere but we can do it locally though
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

      //the event.target is the result of the request which is our data (changes values based on what
      //we use to call it like read or update)
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

      //they call it a table but its a key value thing and it has 2 columns and it has the key in one column and the
      //data stored in that key (the value)
      //one key will have various columns associated with it because it stores each entry seperately in the columns for that key
      //we create index and if we forgot to create index of author then when we query to look up by author name
      //the software has to visit each article and each author for the article and with the index
      //it is faster because it has list of authors already (when we use create index)
      //if we forgot index it would maybe crash the server if there are a lot of users getting specific thing without an index

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
