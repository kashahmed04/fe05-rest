export const deleteToDo = async (id: string) => {
  // this is easy
  //this removes the whole item based on the key even the value associated with the key (can we remove based on the value no)**
  //the key has to be unique and the value can repeat right for all storage and all types of key value pairs in general and in a JSON right**
  localStorage.removeItem(id);
};
