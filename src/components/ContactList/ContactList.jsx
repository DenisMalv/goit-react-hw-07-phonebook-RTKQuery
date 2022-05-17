import React, { useEffect } from 'react';
import css from './ContactList.module.css';
import ContactItem from 'components/ContactItem/ContactItem';
import Loader from 'components/Loader/Loader';
import { LoaderBackground } from 'components/Loader/LoaderBackground.styled';

import { useDispatch, useSelector } from 'react-redux';
import {
  getContacts,
  getFilterValue,
  getLoading,
  getError,
} from 'redux/contactsSlice/contactsSlice';
import { fetchContactsThunk } from 'redux/contactsOperations/contactsOperations';

const ContactList = () => {
  const contactsList = useSelector(getContacts);
  const filteredContacts = useSelector(getFilterValue);
  const isLoading = useSelector(getLoading);
  const isError = useSelector(getError);
  const dispatch = useDispatch();
  //маунт списка при первой загрузке.
  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);
  // слежение за фильтром и отрисовка списка, + отмена предидущего запроса.
  useEffect(() => {
    const promise = dispatch(fetchContactsThunk());
    return () => {
      console.log('effect on  filter abort');
      promise.abort();
    };
  }, [dispatch, filteredContacts]);

  const getFilteredContacts = () => {
    const normalizedFilter = filteredContacts.toLowerCase();
    return contactsList.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  console.log('state posle', contactsList);
  return (
    <>
      {/* loader */}
      {isLoading && (
        <LoaderBackground>
          <Loader />
        </LoaderBackground>
      )}
      {/* error */}
      {isError && <h1>Error 404 :D</h1>}
      {/* notFound */}
      {getFilteredContacts().length === 0 && (
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
