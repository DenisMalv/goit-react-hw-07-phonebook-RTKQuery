export const getFilteredContacts = (data, filterValue) => {
  const normalizedFilter = filterValue.toLowerCase();
  return data.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};
