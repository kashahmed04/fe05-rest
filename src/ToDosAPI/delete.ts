export const deleteToDo = async (id: string) => {
  // this is easy...
  sessionStorage.removeItem(id);
};
