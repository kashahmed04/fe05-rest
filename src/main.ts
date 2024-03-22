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
