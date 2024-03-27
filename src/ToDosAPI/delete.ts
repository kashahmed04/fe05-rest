export const deleteToDo = async (id: string) => {
  localStorage.removeItem(id);
};
