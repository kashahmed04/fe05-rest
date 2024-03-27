import { TODOS_TABLE, getDB } from './db';

export const deleteToDo = async (id: string) => {
  const db = await getDB();
  // we can chain these calls together, if we wish:
  //why can we chain these in delete but nowhere else**
  //is delete and add built in for only indexed DB**
  // or can we use it with local and session storage**
  const request = db
    //we only have one const there thats the request and instead of having seperate variable for each transactino and object sotre
    //and db so if we just took out the variables we are just saying this because we dont need to work with each of these items individually
    .transaction([TODOS_TABLE], 'readwrite')
    .objectStore(TODOS_TABLE)
    .delete(id);

  //go over**
  return new Promise<void>((resolve) => {
    request.onerror = (event) => {
      console.log(`something went wrong deleting ToDo ${id}`, event);
      resolve(); //how do we know when to do resolve because in db.ts we only used it once**
      //what is the event in this case**
    };

    request.onsuccess = (event) => {
      console.log(`deleted ToDo ${id}`, event);
      resolve();
    };
  });
};
