import { ToDo } from './ToDo.type';

export const readToDos = async () => {
  const toDos: ToDo[] = [];

  // iterate over all items in localStorage
  // for slide 2 the storage is the interface and its the general pattern the local and session (use local for session storage instead)
  //storage follow
  //so we can also go through the local storage since its an array of objects right (same for session storage and other types)
  //of storages or just local and session storage****
  //if we know the key we could say const toDoString = localStorage.getItem(key!) without the loop
  for (let i = 0; i < localStorage.length; i++) {
    // get the key at index i
    //basically for each iteration we get the key and it says
    //Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs
    //I thought that if it was equal to it would just return the last key and not null (being the length is
    //beyond because its 0 indexed)
    const key = localStorage.key(i);
    // get the value stored under the key
    //why did we put ! point after key I thought it would go before (we are passing a property into a function or property
    //we are asserting the value we give it has a valid value)
    //local storage get item key works if key is a string and it will not be null
    const toDoString = localStorage.getItem(key!);
    // convert it from a JSON string to an actual POJO (plain old javascript object) ToDo
    //we make this a todo item and parse the specific value from a string to a JS object to work with in our code and read values
    //off of (yes)
    //are we declaring a const variable then making it of type todo for the parse so when the data
    //gets parsed into JS object all the data will be
    //in the same order of the interface or can it be in random order but just include everything in the interface (as long as everything
    //from the interface is there order does not matter)
    const toDo: ToDo = JSON.parse(toDoString!);
    //add it to the list of results
    //push the one item we had of type todo in the line above into the todos array so we can work with it the same way in main.ts and go through
    //the array (yes)
    toDos.push(toDo);
  }

  //return the array of all of our objects to work with them in main like we have been doing
  return toDos;
};
