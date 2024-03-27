import { ToDo } from './ToDo.type';

export const readToDos = async () => {
  const toDos: ToDo[] = [];

  // iterate over all items in localStorage (I thought we would have used Storage like we used in the slides do we use localStorage
  //for local storage and sessionStorage for session storage and index DB is different and we do not use this)**
  for (let i = 0; i < localStorage.length; i++) {
    // get the key at index i
    //basically for each iteration we get the key and it says
    //Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs
    //I thought that if it was equal to it would just return the last key and not null**
    const key = localStorage.key(i);
    // get the value stored under the key
    //we use the ! because we are saying this value will not be null and a key will always have a value (object in JSON for a todo item)
    //associated with it**
    //what if a value was null for a key what would happen**
    //why did we put ! point after key I thought it would go before (for postfix??)**
    const toDoString = localStorage.getItem(key!);
    // convert it from a JSON string to an actual POJO (plain old javascript object) ToDo
    //we make this a todo item and parse the specific value from a string to a JS object to work with in our code and read values
    //off of**
    //are we declaring a const variable then making it of type todo for the parse so when the data
    //gets parsed into JS object all the data will be
    //in the same order of the interface or can it be in random order but just include everything in the interface**
    //why do we need todo: I thought we wouuld not need the : here and just set it equal to the todo of the parsed data**
    //why do we need the ! here what if it reutnrs null because we are saying it does not return null**
    const toDo: ToDo = JSON.parse(toDoString!);
    //this toDo variable gets overridden each time we go through a new object in our local storage then puts it into the todos array
    //after making the object of type todo like the interface**
    //add it to the list of results
    //push the one item we had of type todo in the line above into the todos array so we can work with it the same way in main.ts and go through
    //the array**
    toDos.push(toDo);
  }

  //return the array of all of our objects to work with them in main like we have been doing
  return toDos;
};
