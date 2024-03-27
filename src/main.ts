import './reset.css';
import './styles.css';

import { ToDo } from './ToDosAPI/ToDo.type';
import { ToDosAPI } from './ToDosAPI'; // when no filename is specified, import from "index.ts"

// select references to DOM elements
const addButton = document.querySelector('#add') as HTMLButtonElement;
const createDialog = document.querySelector(
  '#createDialog',
) as HTMLDialogElement;
const createButton = document.querySelector('#create') as HTMLButtonElement;
const deleteButton = document.querySelector('#delete') as HTMLButtonElement;
const titleInput = document.querySelector('#title') as HTMLInputElement;
const descriptionInput = document.querySelector(
  '#description',
) as HTMLInputElement;
const todoList = document.querySelector('#todoList') as HTMLUListElement;

// Step 1 - I wrote you these querySelectors. Nothing to change here, just know they're ready for use.
const editDialog = document.querySelector('#editDialog') as HTMLDialogElement;
const editIdInput = document.querySelector('#editId') as HTMLInputElement;
const editTitleInput = document.querySelector('#editTitle') as HTMLInputElement;
const editDescriptionInput = document.querySelector(
  '#editDescription',
) as HTMLInputElement;
const editButton = document.querySelector('#edit') as HTMLButtonElement;

addButton.addEventListener('click', () => {
  // clear out any previous entry
  titleInput.value = '';
  descriptionInput.value = '';
  // and show the dialog
  createDialog.showModal();
});

// loadToDos : reads all ToDos and displays them in the DOM
const loadToDos = async () => {
  // fetch the data
  const data = await ToDosAPI.read();

  // clear the list
  todoList.replaceChildren();

  let hasSomeCompleted = false;

  // repopulate the list
  data.forEach((todo) => {
    // create <li> parent
    const li = document.createElement('li');

    // create <input> checkbox
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.dataset['id'] = todo.id; // write the todo.id as data-id="" on the <input>
    check.checked = todo.complete;
    check.onclick = async () => {
      // when clicking the checkbox, toggle its status
      await ToDosAPI.update.toggle(todo.id, todo.complete);
      // and reload all ToDos
      loadToDos();
    };

    // remaining children
    li.innerHTML = `
    <div>
    <h2>${todo.title}</h2>
    <p>${todo.description}</p>
    </div>
    `;

    // Step 4 Code Goes Here:
    const editToDoButton = document.createElement('button');
    editToDoButton.innerText = '✏️';
    editToDoButton.onclick = () => {
      editIdInput.value = todo.id;
      editTitleInput.value = todo.title;
      editDescriptionInput.value = todo.description;
      editDialog.showModal();
    };
    li.append(editToDoButton);

    // put the checkbox first/before the <h2>/<p> children
    li.prepend(check);

    // add the <li> to the parent <ul>
    todoList.appendChild(li);

    if (todo.complete) {
      hasSomeCompleted = true;
    }
  });

  if (hasSomeCompleted) {
    deleteButton.classList.remove('hide');
  } else {
    deleteButton.classList.add('hide');
  }
};

createButton.addEventListener('click', async () => {
  // create a ToDo object with info from the DOM
  // (we use Omit<ToDo, 'id'> here because we want to be type-safe, but we don't know what the id is)
  //  https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
  let freshToDo: Omit<ToDo, 'id'> = {
    title: titleInput.value || 'ToDo Title',
    description: descriptionInput.value || 'ToDo Description',
    complete: false,
  };

  // send that freshToDo to the API for creation
  await ToDosAPI.create(freshToDo);

  // then reload all ToDos
  loadToDos();
});

editButton.addEventListener('click', async () => {
  const id = editIdInput.value;
  const title = editTitleInput.value;
  const description = editDescriptionInput.value;

  await ToDosAPI.update.edit(id, { title, description });

  loadToDos();
});

deleteButton.addEventListener('click', async () => {
  // get ALL the checkboxes
  // (we're making the assumption that the only input in the <li> is a checkbox <input>)
  const checks = document.querySelectorAll<HTMLInputElement>('li input');

  // we need to track all calls to ToDosAPI.delete (so we know when they're all done)
  const deleteCalls: Promise<void>[] = [];

  checks.forEach((check) => {
    if (check.checked) {
      // if the ToDo is completed (flagged for delete)
      // delete it! and keep track of the request in the deleteCalls array
      deleteCalls.push(ToDosAPI.delete(check.dataset['id'] || ''));
    }
  });

  // Promise.all waits until all deleteCalls have resolved/rejected, and then calls its .then() callback
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Promise.all(deleteCalls).then(() => {
    // all the deletes are done, reload all ToDos.
    loadToDos();
  });
});

// in the beginning, load all ToDos!
loadToDos();

/**
 * 
 *  //get, getall, put, add, and delete for the index DB API and get is one specific thing and we dont need it here
    //since we get things by the id

    //even if we restart our computer, close the tab, or reload the tab it remains for data but earses if we erase of storage in browser
    //gets full so it does it automatically to erase for local storage
    
    //for session when we close tab then information is gone but if we reload or switch tab and come back but tab it open
    //then data remains there and if we go to another page or url and we come back then the data remains there
    //maintins the data even if we close the tab (but for hot key to open tab again not for doing it with mouse)
    //but if we quit the browser and come abck it goes away

 * NEW NOTES:
 *
 * today we will talk about web storage and Friday will be WebGL
 *
 * web storage API are other ways to persist data (when we say persist data does that mean ways to store data)**
 * storage is used with local storage, session storage, and indexed DB usually (how long data sticks around)**
 *
 * items are stored under key value pairs and both have to be strings in session and local storage but not the
 * rest of the storage types right**
 * (length gives us number of key value pairs stored in the storage in our browser)**
 * we can also get the key at a particular index in storage (so things in local storage go by index so that means they are in array
 * form like how they are in a JSON file usually right so thats why we can go by index)**(like db.JSON)**(each object is 1 entry
 * in array with the key as the id as a string)
 * we can get the value based on the key name
 * we can set item and give it key name and value but if its an existing key (entry)** it will replace (or edit)** that value
 * at that key but if the key does not exist it creates a new entry to go at bottom of JSON (or storage)**
 * we can also remove an item by the key (remove the key and value)** (everything moves up by 1 index when this happens right)**
 * we can also remove all key value pairs in the API storage so nothing is there anymore in our storage and when we
 * refresh our page everything is gone** (when would we want to do this is it when we clear our todos list or is that
 * more like removing individual items so we would use remove item** and for remove
 * a single item that would be like our todos and deleting one item)**
 *
 * are the key value pairs for these funcitons** on slide 2 going to be strings always since
 * local and session storage use them (only??)** and local and session storage key value pairs can only be strings**
 *
 * LOCAL STORAGE:
 *
 * we can talk to window.localstroage so its available everywhere JS runs and its an instance of the interface storage**
 * the data we store here is associated with a specific protocol,host, and port and each website has its own of each
 * for their local storage and if we change any of these we will get different local storage for a different website**
 * this is local to the users machine and never goes to the cloud for local storage (if on PC only on PC and if mobile then
 * only mobile)**
 * this is access sycnhronously and have no callbacks or promises and we have to be careful on how much we
 * read or write data because the data will be slow and hang**
 * this will persist until we call clear outselves or if the storage quota is reached
 * (the things will be stored in the JSON (storage)** will remiain stored if these two things dont happen) (last bullet on slide 4)**
 * we only get 10 MB of data for local storage per web brwoser (same for session storage)**
 * if we have a lot of local storage and session storage (5 MiB max for each) then we get a quote exceded error and**
 *
 * we have the same todos and we go to application tab and go to storage then local storage and we have stoage for our 5173 brwoser
 * (or can it be any number browser we start locally)** and we make a todo and it
 * stores it as a key value pair and the key is the id and the value is the
 * whole object as a string for the todo** (in the console it does not show up as a string though
 * for the value)** (the contents is the same as the todo interface)**
 * we can also click the checkbox for each and it will also change in the local stroage for the complete field??**
 * code was changed in create,read,update,delete files only for this repo not main, index, or todo.type**
 * why s the interface named todo.type what is the .type saying**
 *
 * in create.ts we generate our own id's and we use data.now() and we get the MS the object was created and store it as a string
 * instead of the web brwoser making an id for us
 * we have ...freshtodo to make the freshtodo object with all properties instead of writing it down manually
 * we then do localstorage.setitem the id and the stringify for the obejct to write it as a JSON string to store in our local
 * storage
 *
 * in read.ts we create an empty array and if there are no todos it returns an empty array and we iterate over all the items in our local storage
 * and we get the name of the kye name in the loop then we can get the item with that key by using !key so we say its not going to be null
 * and will have a value to keep TS happy then we parse to make it into a JS object then push it into todos array to use in our code
 * then we return it in our main and use it like how we were
 *
 * in update.ts we parse it as a JSON and we take the exisint todo and make the oppssite of what checked was and set it back to local storage
 * and for edittodo we spread the exissint and editedtodo after it and if there is the same key value pair it uses the most
 * recent one which is the editedtodo and we write it back to local storage
 *
 * for delete.ts we just do local storage.remove item at a location
 *
 * if the users data does not have to exist outside the users machine we can use local storage but if we want it to persist
 * across all devices we use**
 *
 * for local storage even when we close and reopen tab the data will still be there same for when we reload a page and what else**
 * for local storage all of this above here only applied if we use the same device if we see local storage on different device
 * it would not be the same (it will not persist throuhgougt devices)**
 *
 * SESSION STORAGE:
 *
 * we access theouggh session stroage form window interfcae as well** (is this only for local and session storage)**
 * and the data is associated with a sepcific tab and each tab gets its own session storage tab and still based on the
 * users machine only and it persists until the browser closes (reloading and navigating is ok and if we change tabs and
 * come back data will still be there but if we actually
 * close the tab, then the data will not get saved and gets lost) unlike local storage which saves the changes even
 * if we close the tab and come back**
 *
 * what if we close the tab and go in our history and reopen it would it still have what we saved for session storage and
 * local storage**
 *
 * go over first bullet and what about protocol, host, and post like local storage**
 * so loal storage can be used for almost anything but session storage is uaully used for forms
 * for example and usually used to save the text entry on something (last bullet point)**
 *
 * GitHub save form information into session storage and when we come back to tab we repopulate the data but if we close
 * the tab then the data is gone
 *
 * we add todos and it shows up in session storage with key as id and value as object and when we go to different browser tab
 * its empty because each tab has its own version of session sotrage and there is a way to clone it over to another tab
 * and it makes a one time copy in a new browser** the duplicate is only a one time copy and if we change one the
 * other does not chage it just brings the storage there once intially for session storage**
 *
 * for local storage if we open 2 different tabs will there be the same data and if one changes the other one changes then
 * or how would that work**
 *
 * in create.ts we did find and replace and did session sotrage instead of local storage (the difference is ownership rules
 * and how long data persists (lasts??)** for local sotrage and session sotrage)**
 *
 * INDEXED DB:
 *
 * another local version of storage and it ends up being a local transcational (describe our operaions as connected to database and
 * making a transaction and detailing the steps we want to happen and we subtmit those request and it goes through sucessfully
 * the data rolls into the JSON otherwise if there is 1 error all the data is returned back to us) and no sequel is (we have a key
 * for each row in the table and the data can be whatever we want)
 *
 * just like locao stroage it had a specific protocol,host,port and when we store items the only things that is paramount is that we
 * have a key is common and    can be different**
 *
 * unlike local and session sotrage this is event based and we need to do event callbacks and it does not lockup application while these
 * things are happneing and stores more than just strings unlike keys and values in local and session stroage (both need strings
 * for keys and values)
 *
 * we can store a lot in our web brwoser compared to local and session storage (does session and local ahve same sotrage in browser)**
 *
 * persistent mode and not persistent mode
 *
 * in our index db we have a todo data base and it has all out todos in it and we have to press reload button in inspector to see updates
 * (and in brwoser)** and we cant see updates live and the key is id as a string and value is the object and we can delete the data base when
 * we want to rempty it out
 * does data reset when we reload page (or tab)**
 *
 * the code is more complicated for this one and we have an async and if db exists return it otherwise wait initialize the database
 * then do other things then return it and we jabe constants for our file name and we initialize the database wrapped in a promise
 * so we can use it with async we can pass it a resolve callback to let the promise know the work has been done
 *
 * the databse could be long running and we want to make the number 2,3,4 based on our app which is**
 * we may want to do some upgrades based on the database to make sure the app is running as updayed as possible**
 *
 * for all of these data base interactions the event.traget as any is our whole database and when we create the databse we create an object
 * store and we tell it what to use as our key path and we say all of our rows will have a keypath which is the id for the data base
 * we create some indexes to have a data structure for fast access and we can efficienly sort through and find things by title or description
 *
 * in our read.ts we use our db and we create a transaction and we tell is that it potentilyl effects the todos table then we
 * access the specidic table and the request is saying give us all the todos and on an error we resolve with an empty array and on a sucess
 * we get a todos array (or object)** back with event.target as any
 *
 * in our console we have our todo and we show the response we got back**
 *
 * update.ts we away then do a transaction then set read write to say there are read write consequences for this data and
 * modify our complete and we change the complete then we write it back with a put query and if that error is reolves we can continue with
 * the load operation coming in
 *
 * for edittidi its the same idea but we take the todo title and we set it to the edited title
 * otherwise keep what was there previously and put it back into the JSON**
 *
 * delete is more simple and we chain our transaction, objectstore, delete usin gthe same id and we say
 * if theres an error show an error otherwise if its sucessful delete the item from the JSON
 *
 * HTTP COOKIES:
 *
 * older version of web tech and they are small pieces of name value pairs that get passed between client
 * and serevr and each server request will send all cookies to the server associated with the site
 *
 * they are still used in authentication and session management (to login into an account)
 *
 * because of privacy we still get asked to accept cookies (we can mostly use local storage instead though)
 *
 * FIREBASE:
 *
 * google cloud hosted real time storage database in the cloud and its no sequel and we subscribe to somethnig**
 * based on id and**
 * if we use it incorrectly it can become expensive financially
 * we have some sort of long term storage for things and put it in firebase when we want to use it and store it back
 * to another storage we are down to lessen the costs
 *
 * AIRTABLE:
 *
 * like a google spreadsheet but the difference is that we can store a lot of types of information in each cell rather
 * than text (images, videos, etc.)
 *
 * we can use it to populate online store and it has a web API and it has a get record and it makes a request with id in URL and update
 * makes path or put request with some id and create is same thing with post and delete deletes based on id and its a resfull API**
 *
 * there is an API key to access this data
 *
 * in the application tab we have web SQL and we cant use it anymore and it was chrome and googles appracoh to database in a browser
 * but now index DB is used instead
 *
 */
