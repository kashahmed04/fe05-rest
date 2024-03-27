import { ToDo } from './ToDo.type';

//is the complete branch our original branch**
export const createToDo = async (freshToDo: Omit<ToDo, 'id'>) => {
  // generate our own id
  //when we do date.now() does that return our current time in milliseconds for when we create a todo item for the key and we
  //make it a string because only strings can be keys in local storage (and values??)**
  //for session and local storage do they have to be strings for key and value but for index DB the key and value can be anything**
  const id = Date.now().toString();

  // create the object
  const todo: ToDo = {
    id,
    ...freshToDo,
  };

  // the above is shorthand equivalent to
  /*
  const todo: ToDo = {
    id: id,
    title: freshToDo.title,
    description: freshToDo.description,
    complete: freshToDo.complete,
  };
  how does it know to do id: id if we omit it**
  how does it know to do freshtodo.something because I thought it would have copied over this instead from main.ts**
    title: titleInput.value || 'ToDo Title',
    description: descriptionInput.value || 'ToDo Description',
    complete: false,
  */

  // write it to localStorage
  //here we set the key as the id as a string and the stringify turns our JS object we defined in todo above to a string to
  //go to the local storage (the JSON file our db.JSON or our JSON that only shows up in the application in our browser)**
  //does our db.JSON not exist for all storage anymore**
  //was the difference that db.JSON was our data base but now our data base is in the application for our local storage**
  //the whole object becomes a string with JSON.stringify(todo) right so everything after const todo: (the object)
  //is one big string in our local storage
  //right as the value and the key is the id**
  localStorage.setItem(id, JSON.stringify(todo));
};
