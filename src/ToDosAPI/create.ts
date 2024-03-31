import { ToDo } from './ToDo.type';

//is the complete branch our original branch (yes)
export const createToDo = async (freshToDo: Omit<ToDo, 'id'>) => {
  // generate our own id
  //when we do date.now() does that return our current time in milliseconds for when we create a todo item for the key and we
  //make it a string because only strings can be keys in local storage (yes)
  //for session and local storage do they have to be strings for key and value but for index DB the key and value can be anything
  //and if we pass in number for session and local sotrage it makes it a string and we have to make sure to stringify to make sure
  //it becomes an object and not object object
  //the key has to be a string, number, or array for index DB but the value can be almost anything
  const id = Date.now().toString();

  // create the object
  const todo: ToDo = {
    id,
    ...freshToDo,
    //this creates a new id to go into fresh todo or are these two seperate items being added as a value to the id (yes
    //and it gets updated not 2 seperate items)
  };

  // the above is shorthand equivalent to
  /*
  const todo: ToDo = {
    id: id,
    title: freshToDo.title,
    description: freshToDo.description,
    complete: freshToDo.complete,
  };
  the variable we pass in and it uses that to get the data for that object usually with the spread operator to
  destructure it 
  how does it know to do id: id if we omit it (we declared id and in the shorthand if we give it a varible name for the object
  is uses the name as the key and the value as the value)(its a shorthand for what we did above here)
    title: titleInput.value || 'ToDo Title',
    description: descriptionInput.value || 'ToDo Description',
    complete: false,
  */

  // write it to localStorage
  //here we set the key as the id as a string and the stringify turns our JS object we defined in todo above to a string to
  //go to the local storage (and we can see it in the broser under application)
  //was the difference that db.JSON was our data base but now our data base is in the application for our local storage (we moved
  //our data base into the browser now)
  //the whole object becomes a string with JSON.stringify(todo) right so everything after const todo: (the object)
  //is one big string in our local storage (yes)
  //the console shows it as an object for us though not a string
  localStorage.setItem(id, JSON.stringify(todo));
};
