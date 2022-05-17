import { useState } from 'react';
import css from './contactForm.module.css';
import { checkingAddedContact } from 'utils/checkingAddedContact';
import {
  useGetContactsRTKQuery,
  useAddContactRTKMutation,
} from 'redux/RTKContactsApi/ContactsApi';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [addContactRTK] = useAddContactRTKMutation();
  const { data = [] } = useGetContactsRTKQuery();

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

  const handleSubmit = async event => {
    event.preventDefault();
    const contact = {
      name,
      number,
    };
    const newContact = checkingAddedContact(name, data);
    newContact
      ? alert(`${newContact.name} is already in contacts`)
      : await addContactRTK(contact).unwrap();

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
