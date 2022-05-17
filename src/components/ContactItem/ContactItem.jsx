import React from 'react';
import css from './ContactItem.module.css';
import propTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { fetchDeleteContactsThunk } from 'redux/contactsOperations/contactsOperations';
import { getLoading } from 'redux/contactsSlice/contactsSlice';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  return (
    <li className={css.contactList__item}>
      <span className={css.contactList__text}>{`${name}: ${number}`}</span>
      <button
        className={css.contactList__button}
        onClick={() => {
          dispatch(fetchDeleteContactsThunk({ id }));
        }}
        disabled={loading ? true : false}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
};

export default ContactItem;
