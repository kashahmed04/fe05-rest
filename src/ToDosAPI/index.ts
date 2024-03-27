import { createToDo } from './create';
import { readToDos } from './read';
import { editToDo, toggleToDo } from './update'; // Step 3 would like you to update this import.
import { deleteToDo } from './delete';

export const ToDosAPI = {
  create: createToDo,
  read: readToDos,
  update: {
    // Step 3 Code Goes Here
    toggle: toggleToDo,
    edit: editToDo,
  },
  delete: deleteToDo,
};
