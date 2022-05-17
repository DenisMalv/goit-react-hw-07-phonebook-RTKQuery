import React from 'react';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

const App = () => {
  return (
    <main>
      <h1 className="titlePhonebook">Phonebook</h1>
      <ContactForm />
      <h2 className="titleContacts">Contacts</h2>
      <Filter />
      <ContactList />
    </main>
  );
  // }
};

export default App;
