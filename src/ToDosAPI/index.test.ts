import { describe, expect, it } from 'vitest';
import { ToDosAPI } from './';
import { createToDo } from './create';
import { readToDos } from './read';
import { editToDo, toggleToDo } from './update';
import { deleteToDo } from './delete';

describe('ToDosAPI index', () => {
  it('should define a ToDosAPI CRUD interface', () => {
    expect(ToDosAPI.create).toEqual(createToDo);
    expect(ToDosAPI.read).toEqual(readToDos);
    expect(ToDosAPI.update).toEqual({
      toggle: toggleToDo,
      edit: editToDo,
    });
    expect(ToDosAPI.delete).toEqual(deleteToDo);
  });
});
