export const deleteToDo = async (id: string) => {
  // this is easy
  //this removes the whole item based on the key even the value associated with the key (can we remove based on the value no)
  //the key has to be unique and the value can repeat right for all storage and all types of key value pairs in general and in a JSON right
  //this applies to local storage and session storage
  //in line 52 and 53 we create and index for the title field and description field and the index is like glossary at end of
  //book and it tells us what page number something is on and its a data structure for faster lookups in the table
  //and by creating these indicies we can search by title or by description in the database
  //one is the name for the index and one is the name for the field the index reference (we use title in the query we make and it maps
  //to the title in the certain object (name of field in the object))
  //the index name (name of index to create) and the key path is where in the object we go looking for the property
  localStorage.removeItem(id);
};
