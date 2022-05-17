export const checkingAddedContact = (outName, data) => {
  return data.find(({ name }) => name === outName);
};
