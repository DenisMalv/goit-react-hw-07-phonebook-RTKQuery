import React from 'react';
import css from './ContactList.module.css';
import ContactItem from 'components/ContactItem/ContactItem';
import Loader from 'components/Loader/Loader';
import { LoaderBackground } from 'components/Loader/LoaderBackground.styled';

import { useSelector } from 'react-redux';
import { getFilterValue } from 'redux/contactsSlice/contactsSlice';

import { useGetContactsRTKQuery } from 'redux/RTKContactsApi/ContactsApi';

const ContactList = () => {
  const filteredContacts = useSelector(getFilterValue);
  //маунт списка при первой загрузке.
  const { data = [], isError, isFetching } = useGetContactsRTKQuery();

  const getFilteredContacts = () => {
    const normalizedFilter = filteredContacts.toLowerCase();
    return data.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  return (
    <>
      {/* loader */}
      {isFetching && (
        <LoaderBackground>
          <Loader />
        </LoaderBackground>
      )}
      {/* error */}
      {isError && <h1>Error 404 :D</h1>}
      {/* notFound */}
      {getFilteredContacts().length === 0 && !isFetching && !isError && (
        <p style={{ textAlign: 'center', fontSize: 24, fontWeight: 700 }}>
          Contact not found
        </p>
      )}
      {/* completed */}
      {getFilteredContacts().length > 0 && (
        <ul className={css.contactList}>
          {getFilteredContacts().map(({ id, name, number }) => (
            <ContactItem id={id} name={name} number={number} key={id} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactList;
