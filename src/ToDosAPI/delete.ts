export const deleteToDo = async (id: string) => {
  // this is easy
  localStorage.removeItem(id);
};
