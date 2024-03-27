export const deleteToDo = async (id: string) => {
  sessionStorage.removeItem(id);
};
