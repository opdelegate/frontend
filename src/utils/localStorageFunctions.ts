export enum LOCALSTORAGE_OBJECTS_NAMES {
  USER = 'user',
}

export const getItemFromLocalStorage = (
  name: LOCALSTORAGE_OBJECTS_NAMES,
): any => {
  const data = localStorage.getItem(name);
  return data ? JSON.parse(data) : null;
};

export const setItemToLocalStorage = (
  name: LOCALSTORAGE_OBJECTS_NAMES,
  content: any,
) => {
  localStorage.setItem(name, JSON.stringify(content));
};

export const removeItemFromLocalStorage = (
  name: LOCALSTORAGE_OBJECTS_NAMES,
) => {
  localStorage.removeItem(name);
};
