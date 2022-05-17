import { useState } from 'react';
import css from './contactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/contactsSlice/contactsSlice';

import { fetchAddContactThunk } from 'redux/contactsOperations/contactsOperations';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleImputChange = event => {
    const { name, value } = event.currentTarget;
    // eslint-disable-next-line default-case
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
    }
  };

  const checkingAddedContact = outName => {
    return contacts.find(({ name }) => name === outName);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const contact = {
      name,
      number,
    };
    const newContact = checkingAddedContact(name);
    newContact
      ? alert(`${newContact.name} is already in contacts`)
      : dispatch(fetchAddContactThunk(contact));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form className={css.contactForm} onSubmit={handleSubmit}>
        <label className={css.contactForm__label}>
          <span className={css.contactForm__text}>Name</span>
          <input
            className={css.contactForm__input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleImputChange}
            placeholder=""
          />
        </label>
        <label className={css.contactForm__label}>
          <span className={css.contactForm__text}>Number</span>
          <input
            className={css.contactForm__input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={handleImputChange}
            placeholder="+"
            required
          />
        </label>
        <button className={css.contactForm__button} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;
