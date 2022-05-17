import React from 'react';
import css from './ContactItem.module.css';
import propTypes from 'prop-types';

import { useDeleteContactRTKMutation } from 'redux/RTKContactsApi/ContactsApi';

const ContactItem = ({ id, name, number }) => {
  const [deleteContactsRTK, { isLoading }] = useDeleteContactRTKMutation();

  return (
    <li className={css.contactList__item}>
      <span className={css.contactList__text}>{`${name}: ${number}`}</span>
      <button
        className={css.contactList__button}
        onClick={async () => await deleteContactsRTK(id).unwrap()}
        disabled={isLoading}
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
