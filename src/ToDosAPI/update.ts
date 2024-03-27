import { ToDo } from './ToDo.type';

export const toggleToDo = async (id: string, checked: boolean) => {
  // read what's there
  //we parse the specific object in local storage we want by the id
  //and the id is the key so it gets the value (the todo object) based on the id key
  //and it makes the object a JS object**
  //what if its null when we put ! and I thought it usually went before the localStorage how do we know if it goes
  //before or after**
  //we make a variable of type todo that stores an object from local stroage based on the id**
  //the : represents that this variable is going to be of type whatever is on the right of the :**
  //if the type is equal to something on the right then it will be that specific object, array, and what else**
  const existingToDo: ToDo = JSON.parse(localStorage.getItem(id)!);

  // alter it
  // we use the spread** operator to spread the existing todo do say**
  //then we change the checked state to the oppossite of what it was when its clicked**
  //to change the checked state**
  const alteredToDo: ToDo = {
    ...existingToDo,
    complete: !checked,
  };

  // and write it back
  //we set the item to go back to local storage (we dont have a db.JSON data base here)**
  //set item sets the key value pair in the local storage (JSON)** at the specific location or does it
  //refresh to the bottom**
  //when we do set item does it create a new entry if key not already in local sotrage (JSON data base??)**
  //otherwise it just edits the value if the key already exists in the local sotrage**
  //can we change a key or no once we make it then it stays the same**
  //we stringify this item so that we can pass the value in as a string into local storage (makes the whole object
  //a string)
  //if there is an existing key then it overrides whats there otherwise if its a new key then we make a new entry
  localStorage.setItem(id, JSON.stringify(alteredToDo));
};

export const editToDo = async (id: string, editedToDo: Partial<ToDo>) => {
  // read what's there
  const existingToDo: ToDo = JSON.parse(localStorage.getItem(id)!);

  // alter it
  const alteredToDo: ToDo = {
    //would this say edited.id,complete,title,description in that order in the interface or coud it be random
    //order but everything would have to be there from the interface**
    //this would be the same thing for editedtodo but it would be editedtodo.id,complete,title,description**
    ...existingToDo,
    ...editedToDo,
  };

  // and write it back
  localStorage.setItem(id, JSON.stringify(alteredToDo));
};

//the only changes that were made were in create, read, update, and delete right nothing in main, index, or, todotype (yes)
